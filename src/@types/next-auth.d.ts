import  { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        origin?: string;  // Adiciona a propriedade `role` ao tipo User
    }
    interface Session{
        user: DefaultSession["user"] & {
            id: string;
            origin?: string;
        } & DefaultSession["user"];
        
    }
    interface JWT {
        origin?: string;
    }
}