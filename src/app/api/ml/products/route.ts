import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.warn('[products] Access token not provided');
    return NextResponse.json({ error: 'Access token not provided' }, { status: 401 });
  }
  const accessToken = authHeader.replace('Bearer ', '').trim();

  try {
    // Buscar produtos ativos
    const res = await fetch('https://api.mercadolibre.com/users/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) {
      console.error('[products] Failed to fetch user info', res.status);
      return NextResponse.json({ error: 'Failed to fetch user info' }, { status: res.status });
    }
    const user = await res.json();
    const userId = user.id;

    const itemsRes = await fetch(`https://api.mercadolibre.com/users/${userId}/items/search?status=active`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!itemsRes.ok) {
      console.error('[products] Failed to fetch products', itemsRes.status);
      return NextResponse.json({ error: 'Failed to fetch products' }, { status: itemsRes.status });
    }
    const items = await itemsRes.json();
    console.info('[products] Produtos retornados');
    return NextResponse.json(items);
  } catch (err) {
    console.error('[products] Internal error', err);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
} 