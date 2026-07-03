import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { env } from '@/shared/config/env';

const PROTECTED_PATHS = ['/history'];
const AUTH_PATHS = ['/login', '/register'];

function stripLocale(pathname: string): string {
  const segments = pathname.split('/');
  return '/' + segments.slice(2).join('/');
}

export async function updateSession(request: NextRequest, response: NextResponse) {
  const supabase = createServerClient(env.supabaseUrl, env.supabasePublishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const { data, error } = await supabase.auth.getClaims();
  const isAuthenticated = !error && !!data?.claims;

  const pathname = stripLocale(request.nextUrl.pathname);

  const isProtected = PROTECTED_PATHS.some((path) => pathname.startsWith(path));
  const isAuthPage = AUTH_PATHS.some((path) => pathname.startsWith(path));

  if (isProtected && !isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = url.pathname.replace(pathname, '/');
    return NextResponse.redirect(url);
  }

  if (isAuthPage && isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = url.pathname.replace(pathname, '/');
    return NextResponse.redirect(url);
  }

  return response;
}
