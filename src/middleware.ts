import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_ROUTES = [
  '/home',
  '/cart',
  '/category',
  '/checkout',
  '/profile',
  '/restaurant',
];

const AUTH_ROUTES = ['/auth'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  console.log('PROXY HIT:', pathname, 'token:', token);

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/auth?tab=sign-in', request.url));
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
