"use client"
import Link from "next/link";
import { FiUser, FiLogOut, FiLoader, FiLock } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react"
export default function Header() {
    // data->dados do usuario logado
    const { status,data } = useSession();
    console.log(status)
    console.log(data);

    async function handleLogin() {
        try {
            await signIn("credentials", {           
                redirect: true,
                callbackUrl: "/dashboard",
            });

        } catch (error) {
            {
                console.error("Erro ao fazer login:", error);
            }
        }
    }

        async function handleLogout() {
            try {
                await signOut( {
                    callbackUrl: "/",
                });
            } catch (error) {
                console.error("Erro ao fazer logout:", error);
            }
        }
        return (
            <header className="w-full flex items-center px-2 py-4 bg-white h-20 shadow-sm">
                <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
                    <Link href="/">
                        <h1 className="text-2xl font-bold pl-1 hover:tracking-widest duration-300">
                            <span className="text-blue-500">Gerencie </span>Controle
                        </h1>
                    </Link>
 
                    {status === "loading"  &&  (
                        <button className="animate-spin">
                            <FiLoader size={26} color="#4b5563" />
                        </button>
                    )}

                    {status === "unauthenticated" && (
                        <button onClick={handleLogin}>
                            <FiLock size={26} color="#4b5563" />
                        </button>
                    )}

                    {status === "authenticated" && (
                        <div className="flex items-baseline gap-4">
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