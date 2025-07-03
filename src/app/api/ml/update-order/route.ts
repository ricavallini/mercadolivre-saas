import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const bodySchema = z.object({
  orderId: z.string().min(1, 'orderId é obrigatório'),
  status: z.string().min(1, 'status é obrigatório'),
});

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.warn('[update-order] Access token not provided');
    return NextResponse.json({ error: 'Access token not provided' }, { status: 401 });
  }
  const accessToken = authHeader.replace('Bearer ', '').trim();

  let body;
  try {
    body = await request.json();
  } catch {
    console.warn('[update-order] Invalid JSON');
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const parse = bodySchema.safeParse(body);
  if (!parse.success) {
    console.warn('[update-order] Validation error', parse.error.flatten());
    return NextResponse.json({ error: 'Validation error', details: parse.error.flatten() }, { status: 400 });
  }
  const { orderId, status } = parse.data;

  try {
    // Atualizar status do pedido
    const mlRes = await fetch(`https://api.mercadolibre.com/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    const data = await mlRes.json();
    if (!mlRes.ok) {
      console.error('[update-order] Error from ML API', data);
      return NextResponse.json({ error: data.message || 'Erro ao atualizar status', details: data }, { status: mlRes.status });
    }

    console.info('[update-order] Status atualizado', { orderId, status });
    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('[update-order] Internal error', err);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
} 