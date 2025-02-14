import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";
import prisma from "@/lib/prisma";
import { JWTDecodeParams, JWT, encode, decode } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: "/login",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password"}
            },
            async authorize(credentials, req) {
                if(!credentials) return null;
                if (!credentials?.email || !credentials.password) {
                    throw new Error("Credenciais inválidas");
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });
                if (!user) {
                    throw new Error("Credenciais inválidas");
                }
                return user;
            }
        })
    ],
    session: {
        strategy: "jwt", 
        maxAge: 30 * 24 * 60 * 60, 
        updateAge: 24 * 60 * 60, 
        generateSessionToken: () => {
            return crypto.randomUUID();
        },
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
        encode: async ({ secret, token }) => {
            if (!secret) {
                throw new Error("O segredo JWT é obrigatório");
            }
            if (!token || typeof token !== 'object') {
                throw new Error("O token JWT é obrigatório e deve ser um objeto");
            }
            try {
                return encode({ token, secret });
            } catch (err) {
                throw new Error("Falha na codificação JWT");
            }
        },
        decode: async ({ secret, token }: JWTDecodeParams): Promise<JWT | null> => {

            if (!secret || !token || typeof token !== 'string') {
                return null;
            }

            try {
                const payload = await decode({ token, secret });
                return payload;
            } catch (error) {
                console.error("Error decoding JWT:", error);
                return null;
            }
        },
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.picture = user.image;
            }
            return token;
        },
        async session({ session, token }) {

            if (token) {
                session.user = {
                    id: token.id as string,
                    name: token.name as string,
                    email: token.email as string,
                    image: token.picture as string || null
                };
            }
            return session;
        }
    },
};
