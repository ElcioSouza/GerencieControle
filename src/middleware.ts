import { NextResponse, type MiddlewareConfig, NextRequest } from "next/server";

const publicRoutes = [
    { path: "/", whenAuthenticated: 'redirect' },
    { path: "/dashboard", whenAuthenticated: 'next' },
    { path: "/dashboard/collaborator", whenAuthenticated: 'next' },
    { path: "/dashboard/collaborator/new", whenAuthenticated: 'next' },
    { path: "/dashboard/collaborator/editar/[id]", whenAuthenticated: 'next' },
    { path: "/dashboard/edit", whenAuthenticated: 'next' },
    { path: "/dashboard/new", whenAuthenticated: 'next' },
    { path: "/api/auth/callback/credentials", whenAuthenticated: 'next' },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/"
export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const publicCurrentRoute = publicRoutes.find((route) => route.path === path);
    const authToken = req.cookies.get("next-auth.session-token");
    console.log("entrou aqui no middleware");
    if (!authToken && publicCurrentRoute) {
        console.log("entrou aqui 1 if");
        return NextResponse.next();
    }
    if (!authToken?.value && !publicCurrentRoute) {
        console.log("entrou aqui 2 if")
        const redirectUrl = req.nextUrl.clone();
        console.log(redirectUrl);
        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
        return NextResponse.redirect(redirectUrl);
    }
    if (!authToken?.value && publicCurrentRoute && publicCurrentRoute.whenAuthenticated === 'redirect') {
        console.log("entrou aqui 3 if")
        const redirectUrl = req.nextUrl.clone();
        redirectUrl.pathname = '/dashboard';
        return NextResponse.redirect(redirectUrl);
    }
    if (!authToken?.value && !publicCurrentRoute) {
        console.log("entrou aqui 4 if")
       return NextResponse.next();
    }
   return NextResponse.next();
}

export const config: MiddlewareConfig = {
    matcher: [
      '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
  }