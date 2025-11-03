import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, localeCookieName } from '@/config/localization';
import { isLocale } from '@/utils/localization';
import type { Locale } from './types/common';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;

  // ① capture LP hash
  const lp = url.searchParams.get('live_preview');
  const headersOut = new Headers(request.headers);

  if (lp) {
    headersOut.set('x-cs-live-preview', lp);
  } else {
    const saved = request.cookies.get('cs_live_preview')?.value;
    if (saved) headersOut.set('x-cs-live-preview', saved);
  }

  // your existing locale detection...
  const segments = pathname.split('/');
  const hasLocale = segments.some((s) => isLocale(s));
  const currentLocale = segments[1] && isLocale(segments[1]) ? segments[1] : defaultLocale;

  headersOut.set('x-request-locale', currentLocale);

  if (!hasLocale) {
    // ② redirect while preserving query params (incl. live_preview)
    const newUrl = url.clone();
    newUrl.pathname = `/${defaultLocale}${pathname}`;
    // (search params already present on url; we cloned them)

    const resp = NextResponse.redirect(newUrl);
    // ③ persist LP cookie so subsequent requests have the hash
    if (lp) {
      resp.cookies.set('cs_live_preview', lp, {
        maxAge: 60 * 30,
        path: '/',
        sameSite: 'lax',
      });
    }
    return resp;
  }

  // normal flow
  const resp = NextResponse.next({ request: { headers: headersOut } });
  if (lp) {
    resp.cookies.set('cs_live_preview', lp, {
      maxAge: 60 * 30,
      path: '/',
      sameSite: 'lax',
    });
  }
  return resp;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt).*)',
    '/',
  ],
};