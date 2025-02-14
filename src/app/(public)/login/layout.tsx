import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Gerencie Controle - Seu sistema gerenciamento.",
  description: "Gerenciar seus clientes e atende de forma fácil!",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
        {children}
    </>
  );
}
