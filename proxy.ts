import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function proxy(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request);
  const { pathname } = request.nextUrl;

  const publicPaths = ['/', '/login', '/auth/callback'];
  const isPublic =
    publicPaths.includes(pathname) ||
    pathname.startsWith('/curriculum') ||
    pathname.startsWith('/student/units') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/public') ||
    /\.(png|jpg|jpeg|svg|ico|webp|avif|gif)$/.test(pathname);

  if (isPublic) return supabaseResponse;

  // Protected paths — redirect to /login if not authenticated
  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const proxyConfig = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
