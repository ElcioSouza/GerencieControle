import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/providers/auth";
import { ModalProvider } from "@/providers/modal";
//import ReactGA from "react-ga4";
import GoogleAnalytics from "@/components/GoogleAnalytics";
const inter = Inter({ subsets: ["latin"] })
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: "Gerencie Controle - Home",
    template: "%s",
  },
  description: "Gerenciar seus colaboradores e atende de forma fácil!",
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
          <GoogleAnalytics />
            {children}
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
