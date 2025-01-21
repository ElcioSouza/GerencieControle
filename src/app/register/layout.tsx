import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Gerencie Controle - Cadastrar Usuario",
  description: "Gerenciar seus clientes e atende de forma fácil!",
};
export default function RegisterLayout({ children }: { children: React.ReactNode }) {
    return (
            <>
            {children}
            </>
        );
}   