import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";


export async function middleware(req: Request) {

    const secret = process.env.NEXTAUTH_SECRET;
    // Obtém o token da requisição
    const token = await getToken({ req, secret, raw: true } as any);
    // Verifica se o token existe
    if (!token) {
        return NextResponse.json({message: "Nao autenticado"}, {status: 401});
    }

    // Caso esteja autenticado, prossegue normalmente
    return NextResponse.next();
}
 
// Define as rotas que utilizarão este middleware
export const config = {
    matcher: '/api/collaborator/:patch',
  }