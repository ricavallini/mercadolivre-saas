import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const querySchema = z.object({
  orderId: z.string().min(1, 'orderId é obrigatório'),
});

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.warn('[buyer] Access token not provided');
    return NextResponse.json({ error: 'Access token not provided' }, { status: 401 });
  }
  const accessToken = authHeader.replace('Bearer ', '').trim();

  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('orderId');
  const parse = querySchema.safeParse({ orderId });
  if (!parse.success) {
    console.warn('[buyer] Validation error', parse.error.flatten());
    return NextResponse.json({ error: 'Validation error', details: parse.error.flatten() }, { status: 400 });
  }

  try {
    // Buscar detalhes da venda para obter buyer id
    const orderRes = await fetch(`https://api.mercadolibre.com/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!orderRes.ok) {
      console.error('[buyer] Failed to fetch order details', orderRes.status);
      return NextResponse.json({ error: 'Failed to fetch order details' }, { status: orderRes.status });
    }
    const order = await orderRes.json();
    const buyerId = order.buyer?.id;
    if (!buyerId) {
      console.warn('[buyer] Buyer ID not found', { orderId });
      return NextResponse.json({ error: 'Buyer ID not found for this order' }, { status: 404 });
    }

    // Buscar dados do comprador
    const buyerRes = await fetch(`https://api.mercadolibre.com/users/${buyerId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!buyerRes.ok) {
      console.error('[buyer] Failed to fetch buyer info', buyerRes.status);
      return NextResponse.json({ error: 'Failed to fetch buyer info' }, { status: buyerRes.status });
    }
    const buyer = await buyerRes.json();

    console.info('[buyer] Dados do cliente retornados', { orderId, buyerId });
    return NextResponse.json(buyer);
  } catch (err) {
    console.error('[buyer] Internal error', err);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
} 