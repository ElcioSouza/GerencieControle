"use client"
import { signIn, signOut } from "next-auth/react";
import { date } from "@/utils/date";
import Link from "next/link";
interface FooterProps {
  status: string;
  loading: boolean;
}
export function Footer({ status, loading }: FooterProps) {
  const currentData = date();
  const year = currentData.getFullYear();

  function handleLogout() {
    signOut();
  }
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center">

              <span className="ml-2 text-xl font-bold">
                <span className="text-blue-500 inline-block mr-1">Gerencie</span>
                <span className="text-white">Controle</span>
              </span>
            </div>
            <p className="mt-4 text-gray-400">
              Sua solução completa para gestão de chamados
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div>
              <a href="emailto:elcio.monico@gmail.com"> <span className="text-gray-400">elcio.monico@gmail.com</span> </a>
            </div>
            <div>
              <a href="tel:27997813275"> <span className="text-gray-400">(27) 99781-3275</span> </a>
            </div>

          </div>
          <div>

            {status === "unauthenticated" ? (
              <>
                <h4 className="text-lg font-semibold mb-4">Link</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href={""} onClick={() => signIn()} className="text-gray-400 hover:text-white cursor-pointer">
                      Login
                    </Link>
                  </li>
                </ul>
              </>
            ): (
              <>
                 <h4 className="text-lg font-semibold mb-4">Link</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href={"/dashboard"} className="text-gray-400 hover:text-white cursor-pointer">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href={"/dashboard/collaborator"} className="text-gray-400 hover:text-white cursor-pointer">
                      Colaboradores
                    </Link>
                  </li>
                  <li>
                    <Link href={""} onClick={handleLogout} className="text-gray-400 hover:text-white cursor-pointer">
                      Sair
                    </Link>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {year} GerencieControle. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}   