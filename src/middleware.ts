import { getToken } from "next-auth/jwt";
import { NextResponse,NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET, raw: true });
    console.log(token);
    if (!token) {
        return NextResponse.redirect(new URL("/", req.url));
    }
    const response = NextResponse.next();
    response.cookies.set("token",token);
    return response;
}

export const config = {
    matcher: [
        "/dashboard"
    ],
}