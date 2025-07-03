import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const querySchema = z.object({
  orderId: z.string().min(1, 'orderId é obrigatório'),
});

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.warn('[shipping] Access token not provided');
    return NextResponse.json({ error: 'Access token not provided' }, { status: 401 });
  }
  const accessToken = authHeader.replace('Bearer ', '').trim();

  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('orderId');
  const parse = querySchema.safeParse({ orderId });
  if (!parse.success) {
    console.warn('[shipping] Validation error', parse.error.flatten());
    return NextResponse.json({ error: 'Validation error', details: parse.error.flatten() }, { status: 400 });
  }

  try {
    // Buscar detalhes da venda para obter shipping id
    const orderRes = await fetch(`https://api.mercadolibre.com/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!orderRes.ok) {
      console.error('[shipping] Failed to fetch order details', orderRes.status);
      return NextResponse.json({ error: 'Failed to fetch order details' }, { status: orderRes.status });
    }
    const order = await orderRes.json();
    const shippingId = order.shipping?.id;
    if (!shippingId) {
      console.warn('[shipping] Shipping ID not found', { orderId });
      return NextResponse.json({ error: 'Shipping ID not found for this order' }, { status: 404 });
    }

    // Buscar dados de envio
    const shippingRes = await fetch(`https://api.mercadolibre.com/shipments/${shippingId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!shippingRes.ok) {
      console.error('[shipping] Failed to fetch shipping info', shippingRes.status);
      return NextResponse.json({ error: 'Failed to fetch shipping info' }, { status: shippingRes.status });
    }
    const shipping = await shippingRes.json();

    // Link da etiqueta
    const labelUrl = shipping.tags?.includes('self_service_in') && shipping.self_service_in?.label_url
      ? shipping.self_service_in.label_url
      : shipping.label_url;

    console.info('[shipping] Dados de envio retornados', { orderId, shippingId });
    return NextResponse.json({ ...shipping, labelUrl });
  } catch (err) {
    console.error('[shipping] Internal error', err);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
} 