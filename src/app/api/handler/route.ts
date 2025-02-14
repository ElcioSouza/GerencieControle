import {NextResponse} from  'next/server';
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
    const {email, password, body} = await request.json();
    try {
        const userResponse = await fetch("https://oauth2.googleapis.com/projetosecreto123", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                client_id: process.env.GOOGLE_CLIENT_ID!,
                client_secret: process.env.GOOGLE_CLIENT_SECRET!,
                redirect_uri: "http://localhost:3000/api/auth/callback/google",
            })
        });
        console.log(userResponse)

        if (!userResponse.ok) {
            const errorData = await userResponse.json();
            return NextResponse.json({userData: errorData}, {status: 400});
        }

        const userData = await userResponse.json();
        return NextResponse.json({userData: userData}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: "error interno do servidor"}, {status: 500});
    } 
}
