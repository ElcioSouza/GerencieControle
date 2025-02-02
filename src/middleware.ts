import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET, raw: true });
    console.log("Token:", token);

    if (token) {
        // Permitir acesso apenas às páginas protegidas
        if (req.nextUrl.pathname.startsWith("/dashboard") || req.nextUrl.pathname === "/teste") {
            console.log("Permitir acesso: " + req.nextUrl.pathname);
            return NextResponse.next();
        } else {
            // Redirecionar para /dashboard se tentar acessar páginas não protegidas
            console.log("Redirecionando para /dashboard porque o token está presente.");
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }
    }

    // Permitir acesso às páginas não protegidas para usuários não autenticados
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",          // Página inicial
        "/teste",     // Página de teste
        "/dashboard/:path*"  // Inclui todas as subpáginas do dashboard
    ],
}
