import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getUser } from './lib/auth';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Protege todas as rotas /admin exceto a página de login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const user = await getUser(request);

    if (!user) {
      const url = new URL('/admin/login', request.url);
      url.searchParams.set('from', pathname);
      return NextResponse.redirect(url);
    }

    // Adiciona o user ao headers para uso posterior
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', user.id);
    requestHeaders.set('x-user-role', user.role);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
