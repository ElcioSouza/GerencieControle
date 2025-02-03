import { NextResponse, type MiddlewareConfig, NextRequest } from "next/server";

const publicRoutes = [
    { path: "/", whenAuthenticated: 'redirect' },
    { path: "/dashboard", whenAuthenticated: 'next' },
    { path: "/dashboard/collaborator", whenAuthenticated: 'redirect' },
    { path: "/dashboard/collaborator/new", whenAuthenticated: 'next' },
    { path: "/dashboard/collaborator/editar/[id]", whenAuthenticated: 'next' },
    { path: "/dashboard/edit/[id]", whenAuthenticated: 'next' },
    { path: "/dashboard/new", whenAuthenticated: 'next' },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/";

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    const publicCurrentRoute = publicRoutes
        .map((route) => matchRoute(route.path, path, route))
        .find(result => result.matched);

    const authToken = req.cookies.get("next-auth.session-token");

    if (!authToken && publicCurrentRoute) {
        return NextResponse.next();
    }
    if (!authToken && !publicCurrentRoute) {
        const redirectUrl = req.nextUrl.clone();
        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
        return NextResponse.redirect(redirectUrl);
    }
    if (authToken && publicCurrentRoute && publicCurrentRoute.route.whenAuthenticated === 'redirect') {
        const redirectUrl = req.nextUrl.clone();
        redirectUrl.pathname = "/dashboard";
        return NextResponse.redirect(redirectUrl);
    }
    if (!authToken && !publicCurrentRoute) {
        return NextResponse.next();
    }
    return NextResponse.next();
}

function matchRoute(routePath: string, requestPath: string, route: { path: string, whenAuthenticated: string }) {
    const routeRegex = new RegExp(`^${routePath.replace(/\[([^\]]+)\]/g, '([^/]+)')}$`);
    const match = requestPath.match(routeRegex);

    if (!match) return { matched: false, params: {}, route };

    const params: Record<string, string> = {};
    const paramNames = (routePath.match(/\[([^\]]+)\]/g) || []).map(param => param.replace(/[\[\]]/g, ''));

    paramNames.forEach((paramName, index) => {
        params[paramName] = match[index + 1];
    });

    return { matched: true, params, route };
}

export const config: MiddlewareConfig = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}