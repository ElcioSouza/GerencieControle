import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/providers/auth";
import { ModalProvider } from "@/providers/modal";


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
    <html lang="pt-br" className={`${inter.className}`}>
      <body>
        <AuthProvider>
          <ModalProvider >
            <Header />
            {children}
            <Footer />
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
