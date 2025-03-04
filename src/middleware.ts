import { getToken } from "next-auth/jwt";
import { NextResponse, type MiddlewareConfig, NextRequest } from "next/server";

const publicRoutes = [
    { path: "/login", whenAuthenticated: 'redirect' },    
    { path: "/register", whenAuthenticated: 'redirect' },    
    { path: "/dashboard", whenAuthenticated: 'next' },
    { path: "/dashboard/collaborator", whenAuthenticated: 'next' },
    { path: "/dashboard/collaborator/new", whenAuthenticated: 'next' },
    { path: "/dashboard/collaborator/editar/[id]", whenAuthenticated: 'next' },
    { path: "/dashboard/edit/[id]", whenAuthenticated: 'next' },
    { path: "/dashboard/new", whenAuthenticated: 'next' },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/";

export async function middleware(req: NextRequest) {
    const secret = process.env.NEXTAUTH_SECRET;
    const path = req.nextUrl.pathname;

    const publicCurrentRoute = publicRoutes
        .map((route) => matchRoute(route.path, path, route))
        .find(result => result.matched);
    const authToken = await getToken({ req, secret, raw: true } as any);
    const response = NextResponse.next();
    if (publicCurrentRoute) {
        if (!authToken && publicCurrentRoute && publicCurrentRoute?.route.whenAuthenticated === 'next') {
            const redirectUrl = req.nextUrl.clone();
            redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
            return NextResponse.redirect(redirectUrl);
        }

        if (!authToken && !publicCurrentRoute) {
            const redirectUrl = req.nextUrl.clone();
            redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
            return NextResponse.redirect(redirectUrl);
        }

        if (!authToken && publicCurrentRoute) {
            return response;
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
            return response;
        }
        if (authToken && publicCurrentRoute && publicCurrentRoute.route.whenAuthenticated === 'next') {
            response.cookies.set("auth-token", String(authToken), {
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
            });
        }
        return response;
    } else {
        return response;
    }
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
