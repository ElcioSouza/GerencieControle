import  { DefaultSession } from "next-auth";
declare module 'nodemailer';
declare module "next-auth" {
    interface User {
        origin?: string;
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