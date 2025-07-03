import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.warn('[orders] Access token not provided');
    return NextResponse.json({ error: 'Access token not provided' }, { status: 401 });
  }
  const accessToken = authHeader.replace('Bearer ', '').trim();

  try {
    // Buscar últimas vendas
    const res = await fetch('https://api.mercadolibre.com/orders/search?seller=me&sort=date_desc&limit=20', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) {
      console.error('[orders] Failed to fetch orders', res.status);
      return NextResponse.json({ error: 'Failed to fetch orders' }, { status: res.status });
    }
    const data = await res.json();
    console.info('[orders] Vendas retornadas');
    return NextResponse.json(data);
  } catch (err) {
    console.error('[orders] Internal error', err);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
} 