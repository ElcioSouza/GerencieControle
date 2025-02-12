import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";
import prisma from "@/lib/prisma";
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
        secret: process.env.NEXTAUTH_SECRET, // Define o segredo usado para assinar os tokens JWT
        // encode verifica se o segredo foi fornecido e se o token foi fornecido e se ele é um objeto

        /**
         * Codifica um token JWT usando o segredo fornecido.
         * @param {Object} params – Os parâmetros para codificação.
         * @param {string} params.secret – A chave secreta usada para codificação.
         * @param {Object} params.token – O token JWT a ser codificado.
         * @returns {Promessa<string>} O token JWT codificado.
         */
        encode: async ({ secret, token }) => {
            if (!secret) {
                throw new Error("O segredo JWT é obrigatório");
            }
            if (!token || typeof token !== 'object') {
                throw new Error("O token JWT é obrigatório e deve ser um objeto");
            }
            try {
                // encode e um metodo que assina o token com o segredo e retorna o token assinado
                return encode({ token, secret });
            } catch (err) {
                throw new Error("Falha na codificação JWT");
            }
        },
        /**
        * Decodifica um token JWT usando o segredo fornecido.
         * @param {Object} params – Os parâmetros para decodificação.
         * @param {string} params.secret – A chave secreta usada para decodificação.
         * @param {string} params.token – O token JWT a ser decodificado.
         * @returns {Promessa<JWT | null>} A carga útil do token decodificado ou nulo se a decodificação falhar.
         */
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
        /**
         * Função callback chamada quando o Next-Auth precisa criar ou atualizar um token JWT.
         * Ela recebe como parâmetro o token atual e o usuário logado.
         * Se o usuário for null, significa que o token ainda não foi criado.
         * Se o usuário for fornecido, o token é atualizado com os dados do usuário.
         * @param {Object} token - O token JWT atual.
         * @param {Object} user - O usuário logado.
         * @returns {Object} O token JWT atualizado.
         */
        async jwt({ token, user }) {
            
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.picture = user.image
            }
            return token;
        },

        /**
         * Função callback chamada quando o Next-Auth precisa criar ou atualizar uma sessão.
         * Ela recebe como parâmetro a sessão atual e o token JWT decodificado.
         * Se o token for null, significa que o usuário ainda não está logado.
         * Se o token for fornecido, a sessão é atualizada com os dados do usuário.
         * @param {Object} session - A sessão atual.
         * @param {Object} token - O token JWT decodificado.
         * @returns {Object} A sessão atualizada.
         */
        async session({ session, token }) {
            if (token) {
                // Atualiza a sessão com os dados do usuário.
                session.user = {
                    id: token.id as string,
                    name: token.name as string,
                    email: token.email as string,
                    image: token.picture as string
                };
            }
            return session;
        }
    },
};
