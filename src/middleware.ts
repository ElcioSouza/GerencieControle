import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const secret = process.env.NEXTAUTH_SECRET;
    console.log("token:",secret);

    try {
        const token = await getToken({ req, secret, raw: true });

        if (!token) {
            return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
        }
        console.log("token:",token);

        return NextResponse.next();
    } catch (error) {
        console.error("Erro ao verificar a autenticação:", error);
        return NextResponse.json({ message: "Erro de autenticação" }, { status: 500 });
    }
}

export const config = {
    matcher: ['/api/:path'], // Permite rotas mais flexíveis
};