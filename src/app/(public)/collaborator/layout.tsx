import type { Metadata } from "next";
export const metadata: Metadata = {
  title: {
    default: "Gerencie Controle",
    template: "%s | Elcio Monico Portfolio",
  },
  description: "Gerenciar seus clientes e atende de forma fácil!",

};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
        {children}
    </>
  );
}
