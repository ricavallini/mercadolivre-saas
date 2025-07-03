import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.warn('[me] Access token not provided');
    return NextResponse.json({ error: 'Access token not provided' }, { status: 401 });
  }
  const accessToken = authHeader.replace('Bearer ', '').trim();

  try {
    // Buscar dados do usuário autenticado
    const res = await fetch('https://api.mercadolibre.com/users/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) {
      console.error('[me] Failed to fetch user info', res.status);
      return NextResponse.json({ error: 'Failed to fetch user info' }, { status: res.status });
    }
    const user = await res.json();
    console.info('[me] Dados do usuário retornados');
    return NextResponse.json(user);
  } catch (err) {
    console.error('[me] Internal error', err);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
} 