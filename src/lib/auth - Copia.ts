// configuracao do next-auth qual provider vamos utilizar
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";
import  prisma from "./prisma";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    callbacks: {
        // quando fazer login vamos ter uma sessão do usuario
        async session({session,token,user}) {
           session.user= {...session.user, id: user.id} as {
               id: string;
               name: string;
               email: string;
           }
           console.log(session);
          return session;
        }
    }
};
