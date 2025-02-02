import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET, raw: true });
    if (token) {
        if (req.nextUrl.pathname.startsWith("/dashboard")) {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/dashboard/:path*"
    ],
}
