import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Gerencie Controle - Abrir um chamado",
  description: "Gerenciar seus clientes e atende de forma fácil!",
};
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
        );
}   