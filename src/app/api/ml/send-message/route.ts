import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Access token not provided' }, { status: 401 });
  }
  const accessToken = authHeader.replace('Bearer ', '').trim();

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const { orderId, text } = body;
  if (!orderId || !text) {
    return NextResponse.json({ error: 'orderId and text are required' }, { status: 400 });
  }

  // Buscar detalhes da venda para obter buyer id
  const orderRes = await fetch(`https://api.mercadolibre.com/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!orderRes.ok) {
    return NextResponse.json({ error: 'Failed to fetch order details' }, { status: orderRes.status });
  }
  const order = await orderRes.json();
  const buyerId = order.buyer?.id;
  if (!buyerId) {
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
    return NextResponse.json({ error: data.message || 'Erro ao enviar mensagem', details: data }, { status: msgRes.status });
  }

  return NextResponse.json({ success: true, data });
} 