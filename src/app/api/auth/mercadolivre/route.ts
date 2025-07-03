import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.MERCADOLIVRE_CLIENT_ID;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/mercadolivre/callback`;

  if (!clientId) {
    return new NextResponse('Mercado Livre Client ID not configured', { status: 500 });
  }

  const authUrl = `https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

  return NextResponse.redirect(authUrl);
}
