import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/providers/auth";
import { ModalProvider } from "@/providers/modal";
import ReactGA from "react-ga4";
ReactGA.initialize("G-0F59VKD9NS");
ReactGA.send({ hitType: "pageview", page: window.location.pathname });
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

            {children}
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
