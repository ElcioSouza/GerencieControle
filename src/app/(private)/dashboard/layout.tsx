import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { DashboardHeader } from "./components/header";
import { Header } from "@/components/Header";
import { AuthProvider } from "@/providers/auth";
import { ModalProvider } from "@/providers/modal";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] })
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gerencie Controle - Seu sistema gerenciamento.",
  description: "Gerenciar seus clientes e atende de forma fácil!",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthProvider>
        <ModalProvider>
          <DashboardHeader />
          {children}
        </ModalProvider>
      </AuthProvider>
    </>
  );
}
