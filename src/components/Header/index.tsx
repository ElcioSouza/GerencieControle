"use client"
import Link from "next/link";
import { FiUser, FiLogOut, FiLoader, FiLock } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react"
import { Submenu } from "@/components/SubMenu";
import Image from "next/image";
import { CiLogin } from "react-icons/ci";
import { LuUserPlus } from "react-icons/lu";

export function Header() {
    const { data, status } = useSession();
    const menuItems = [
        { label: 'Chamados', href: '/dashboard' },
        { label: 'Colaborador', href: '/dashboard/collaborator' },
    ];

    async function handleLogin() {
        try {
            await signIn("google");

        } catch (error) {
            {
                console.error("Erro ao fazer login:", error);
            }
        }
    }

    async function handleLogout() {
        try {
            document.cookie = "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            await signOut();
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    }
    function getUserFirstAndSecondLetter() {
        const name = data?.user?.name;
        const userName = name?.split(" ")
        const userNameLetter = userName?.map((item) => item.charAt(0))
        return userNameLetter;
    }

    return (
        <header className="w-full flex items-center px-2 py-4 bg-white h-20 shadow-sm login">
            <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
                <Link href="/">
                    <h1 className="text-2xl font-bold pl-1 hover:tracking-widest duration-300">
                        <span className="text-blue-500">Gerencie </span>Controle
                    </h1>
                </Link>

                {status === "loading" && !data && (
                    <button className="animate-spin">
                        <FiLoader size={26} color="#4b5563" />
                    </button>
                )}

                {status === "unauthenticated" && (
                    <div className="flex items-center space-x-4">
                        <Link href="/login" className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium flex items-center">
                        <CiLogin className="w-4 h-4 mr-2" />
                        Entrar
                        </Link>
                        <Link href="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center">
                        <LuUserPlus className="w-4 h-4 mr-2" />
                        Cadastrar
                        </Link>
                  </div>
                )}

                {status === "authenticated" && (


                    <div className="flex items-baseline gap-4">

                        {data?.user.image ? (
                            <Submenu
                                items={menuItems} title={<><Image src={data?.user?.image ?? ''} alt="profile" width={29} height={29} className="rounded-full" /></>} />
                        ) : (
                            <Submenu
                                items={menuItems} title={<><div className="bg-gray-200 px-3 py-1 rounded-full text-sm font-medium">{getUserFirstAndSecondLetter()}</div></>} />
                        )}
                        <Link href={"/dashboard"}>
                            <FiUser size={26} color="#4b5563" />
                        </Link>
                        <button onClick={handleLogout}>
                            <FiLogOut size={26} color="#ff2313" />
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}