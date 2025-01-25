import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const refreshToken = req.cookies.get('next-auth.refresh-token');
    console.log(refreshToken);
    if (!refreshToken) { 
        return NextResponse.json({ message: "Nao autenticado" }, { status: 401 });
    }
    const secret = process.env.NEXTAUTH_SECRET;
    try {
        const token = await getToken({ req, secret, raw: true });
        if (!token) {
            return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
        }
        return NextResponse.next();
    } catch (error) {
        console.error("Erro ao verificar a autenticação:", error);
        return NextResponse.json({ message: "Erro de autenticação" }, { status: 500 });
    }
}

export const config = {
    matcher: ['/api/:path'],
};