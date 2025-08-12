import { NextRequest, NextResponse } from 'next/server';
import { assignTrialIfMissing } from './src/lib/ab';

export function middleware(request: NextRequest) {
  // APIルートは除外
  if (request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next();
  }
  
  const response = NextResponse.next();
  return assignTrialIfMissing(request, response);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
