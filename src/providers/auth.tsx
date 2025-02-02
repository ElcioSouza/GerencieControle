"use client";

import { SessionProvider, SessionProviderProps } from "next-auth/react";

export const AuthProvider = ({ children, ...props }: SessionProviderProps) => {
    
    return (
    <SessionProvider>
        {children}
    </SessionProvider>);    
}