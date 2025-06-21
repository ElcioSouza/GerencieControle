import  { DefaultSession } from "next-auth";
declare module 'nodemailer';
declare module "next-auth" {
    interface User {
        origin?: string;
        status?: string;
    }
    interface Session{
        user: DefaultSession["user"] & {
            id: string;
            origin?: string;
            status?: string;
        } & DefaultSession["user"];
        
    }
    interface JWT {
        origin?: string;
        status?: string;
    }
}