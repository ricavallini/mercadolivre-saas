import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const querySchema = z.object({
  orderId: z.string().min(1, 'orderId é obrigatório'),
});

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.warn('[order-details] Access token not provided');
    return NextResponse.json({ error: 'Access token not provided' }, { status: 401 });
  }
  const accessToken = authHeader.replace('Bearer ', '').trim();

  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('orderId');
  const parse = querySchema.safeParse({ orderId });
  if (!parse.success) {
    console.warn('[order-details] Validation error', parse.error.flatten());
    return NextResponse.json({ error: 'Validation error', details: parse.error.flatten() }, { status: 400 });
  }

  try {
    // Buscar detalhes da venda
    const orderRes = await fetch(`https://api.mercadolibre.com/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!orderRes.ok) {
      console.error('[order-details] Failed to fetch order details', orderRes.status);
      return NextResponse.json({ error: 'Failed to fetch order details' }, { status: orderRes.status });
    }
    const order = await orderRes.json();
    console.info('[order-details] Detalhes da venda retornados', { orderId });
    return NextResponse.json(order);
  } catch (err) {
    console.error('[order-details] Internal error', err);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
} 