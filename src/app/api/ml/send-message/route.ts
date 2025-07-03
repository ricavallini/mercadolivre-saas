import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const bodySchema = z.object({
  orderId: z.string().min(1, 'orderId é obrigatório'),
  text: z.string().min(1, 'Mensagem não pode ser vazia'),
});

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.warn('[send-message] Access token not provided');
    return NextResponse.json({ error: 'Access token not provided' }, { status: 401 });
  }
  const accessToken = authHeader.replace('Bearer ', '').trim();

  let body;
  try {
    body = await request.json();
  } catch {
    console.warn('[send-message] Invalid JSON');
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parse = bodySchema.safeParse(body);
  if (!parse.success) {
    console.warn('[send-message] Validation error', parse.error.flatten());
    return NextResponse.json({ error: 'Validation error', details: parse.error.flatten() }, { status: 400 });
  }
  const { orderId, text } = parse.data;

  try {
    // Buscar detalhes da venda para obter buyer id
    const orderRes = await fetch(`https://api.mercadolibre.com/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!orderRes.ok) {
      console.error('[send-message] Failed to fetch order details', orderRes.status);
      return NextResponse.json({ error: 'Failed to fetch order details' }, { status: orderRes.status });
    }
    const order = await orderRes.json();
    const buyerId = order.buyer?.id;
    if (!buyerId) {
      console.warn('[send-message] Buyer ID not found', { orderId });
      return NextResponse.json({ error: 'Buyer ID not found for this order' }, { status: 404 });
    }

    // Enviar mensagem ao comprador
    const msgRes = await fetch(`https://api.mercadolibre.com/messages/orders/${orderId}/seller`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: { user_id: order.seller.id },
        to: { user_id: buyerId },
        text: { plain: text },
      }),
    });

    const data = await msgRes.json();
    if (!msgRes.ok) {
      console.error('[send-message] Error from ML API', data);
      return NextResponse.json({ error: data.message || 'Erro ao enviar mensagem', details: data }, { status: msgRes.status });
    }

    console.info('[send-message] Mensagem enviada', { orderId, buyerId });
    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('[send-message] Internal error', err);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
} 