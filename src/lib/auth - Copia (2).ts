import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";
import prisma from "./prisma";
import { JWTDecodeParams, JWT, encode, decode } from "next-auth/jwt";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    session: {
        strategy: "jwt", // Define que as sessões serão gerenciadas usando JWT.
        maxAge: 30 * 24 * 60 * 60, // Define o tempo de expiração da sessão (30 dias, neste caso).
        updateAge: 24 * 60 * 60, // Define a frequência com que a sessão será atualizada (24 horas, neste caso).
        generateSessionToken: () => {
            return crypto.randomUUID();
        },
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET, // Define o segredo usado para assinar os tokens JWT.
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
                console.log("inicio payload", payload, "fim payload");
                return payload;
            } catch (error) {
                // Lidar com erros de decodificação
                console.error("Erro ao decodificar JWT", error);
                return null;
            }
        },
    },
    callbacks: {
        async jwt({ token, user }) {
            console.log("INICIO JWT USER--------------------------------------", user, "------------------------FIM JWT USER");
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
            }
            console.log("Token atualizado:", token);
            return token;
        },
        async session({ session, token }) {
            if (token) {
                console.log("INICIO TOKEN--------------------------------------", token, "------------------------FIM TOKEN");
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                console.log("INICIO SESSION--------------------------------------", session, "------------------------FIM SESSION");
            }
            return session;
        }
    },
};
