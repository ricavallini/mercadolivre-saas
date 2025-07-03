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
  const { orderId, status } = body;
  if (!orderId || !status) {
    return NextResponse.json({ error: 'orderId and status are required' }, { status: 400 });
  }

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
    return NextResponse.json({ error: data.message || 'Erro ao atualizar status', details: data }, { status: mlRes.status });
  }

  return NextResponse.json({ success: true, data });
} 