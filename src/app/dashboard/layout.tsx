import { DashboardHeader } from "./components/header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { AuthProvider } from "@/providers/auth";
import { ModalProvider } from "@/providers/modal";

const inter = Inter({ subsets: ["latin"] })
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gerencie Controle - Seu sistema gerenciamento.",
  description: "Gerenciar seus colaboradores e atende de forma fácil!",
};
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
      <ModalProvider>
        <Header />
        <DashboardHeader />
        {children}

      </ModalProvider>
  );
}   