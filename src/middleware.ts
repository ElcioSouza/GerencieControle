import { NextResponse, type MiddlewareConfig, NextRequest } from "next/server";

const publicRoutes = [
    { path: "/", whenAuthenticated: 'redirect' },
    { path: "/teste", whenAuthenticated: 'redirect' },
    { path: "/api/auth/callback/credentials", whenAuthenticated: 'next' },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/"
export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const publicCurrentRoute = publicRoutes.find((route) => route.path === path);
    const authToken = req.cookies.get("next-auth.session-token");
    if (!authToken && publicCurrentRoute) {
        return NextResponse.next();
    }
    if (!authToken && !publicCurrentRoute) {
        const redirectUrl = req.nextUrl.clone();
        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
        return NextResponse.redirect(redirectUrl);
    }
    if (authToken && publicCurrentRoute && publicCurrentRoute.whenAuthenticated === 'redirect') {
        const redirectUrl = req.nextUrl.clone();
        redirectUrl.pathname = '/dashboard';
        return NextResponse.redirect(redirectUrl);
    }
    if (authToken && !publicCurrentRoute) {
        return NextResponse.next();
    }
    return NextResponse.next();
}

export const config: MiddlewareConfig = {
    matcher: [
      '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
  }