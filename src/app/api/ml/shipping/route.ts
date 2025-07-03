import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Access token not provided' }, { status: 401 });
  }
  const accessToken = authHeader.replace('Bearer ', '').trim();

  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('orderId');
  if (!orderId) {
    return NextResponse.json({ error: 'orderId is required' }, { status: 400 });
  }

  // Buscar detalhes da venda para obter shipping_id
  const orderRes = await fetch(`https://api.mercadolibre.com/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!orderRes.ok) {
    return NextResponse.json({ error: 'Failed to fetch order details' }, { status: orderRes.status });
  }
  const order = await orderRes.json();
  const shippingId = order.shipping?.id;
  if (!shippingId) {
    return NextResponse.json({ error: 'Shipping ID not found for this order' }, { status: 404 });
  }

  // Buscar dados de envio
  const shippingRes = await fetch(`https://api.mercadolibre.com/shipments/${shippingId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!shippingRes.ok) {
    return NextResponse.json({ error: 'Failed to fetch shipping info' }, { status: shippingRes.status });
  }
  const shipping = await shippingRes.json();

  // Buscar URL da etiqueta
  const labelRes = await fetch(`https://api.mercadolibre.com/shipments/${shippingId}/labels`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  let labelUrl = null;
  if (labelRes.ok) {
    const labelData = await labelRes.json();
    labelUrl = labelData?.print?.[0]?.label_url || labelData?.label_url || null;
  }

  return NextResponse.json({ shipping, labelUrl });
} 