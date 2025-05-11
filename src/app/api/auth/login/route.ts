import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { authenticate, signJWT } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const user = await authenticate(email, password);
    if (!user) {
      return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
    }

    const token = await signJWT(user);
    const cookieStore = cookies();

    cookieStore.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 8 * 60 * 60, // 8 horas
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Erro ao processar login' }, { status: 500 });
  }
}
