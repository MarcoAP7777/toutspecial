import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { validateUser } from './users';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export type UserData = {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'MANAGER';
};

export async function signJWT(payload: UserData) {
  try {
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('8h')
      .sign(new TextEncoder().encode(JWT_SECRET));

    return token;
  } catch (error) {
    console.error('Error signing JWT:', error);
    throw new Error('Failed to sign JWT');
  }
}

export async function verifyJWT(token: string): Promise<UserData | null> {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
    return payload as UserData;
  } catch (error) {
    console.error('Error verifying JWT:', error);
    return null;
  }
}

export async function getUser(request?: NextRequest) {
  const cookieStore = request ? request.cookies : cookies();
  const token = cookieStore.get('auth-token');

  if (!token) {
    return null;
  }

  return verifyJWT(token.value);
}

export async function authenticate(email: string, password: string): Promise<UserData | null> {
  return validateUser(email, password);
}

export async function setAuthCookie(token: string) {
  cookies().set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 8 * 60 * 60, // 8 hours
  });
}

export async function clearAuthCookie() {
  cookies().delete('auth-token');
}

// Mock de usuários para desenvolvimento
export const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@toutspecial.com',
    password: 'admin123', // Em produção, usar hash
    name: 'Administrador',
    role: 'ADMIN' as const,
  },
];
