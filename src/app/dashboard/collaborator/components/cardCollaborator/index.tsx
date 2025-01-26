"use client";
import { useState } from "react";
import { CollaboratorProps } from "@/utils/cardCollaborator.type";
import { useRouter } from "next/navigation";
import { Pagination } from 'antd';
import { FiSearch } from "react-icons/fi";
import { ButtonRefresh } from "@/app/dashboard/components/buttonrefresh";
import Link from "next/link";
export function CardCollaborator({ collaborator }: { collaborator: CollaboratorProps[] }) {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const ITEMS_PER_PAGE = 3;

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentCollaborators = collaborator.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    async function handleDeleteCollaborator(id: string) {
        try {
            if (confirm("Deseja deletar o colaborador?")) {
                const response = await fetch(`/api/collaborator?id=${id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const result = await response.json();
                if (result?.pack?.status === "Em andamento" || result?.pack?.status === "Urgente" || result?.pack?.status === "Baixo" || result?.pack?.status === "Pendente") {
                    alert(result?.pack?.error);
                }
                router.refresh();
            }
        } catch (error) {
            console.log(error);
        }
    }
    function handlePageChange(page: number) {
        setCurrentPage(page);
    }
    return (
        <>
          <div className="flex items-center justify-between">
                <h1 className="font-bold text-[20px] md:text-3xl">Meus Colaboradores</h1>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <button className="absolute right-2 z-1 top-2"><FiSearch size={18} color="#4b5563" /></button>
                       {/* <input type="text"
                            placeholder="Pesquisar Colaborador"
                            className="border-2 border-slate-300 rounded-md pr-7 pl-2 p-1 outline-none"
                            onChange={(e) => setSearch(e.target.value) }
                        />  */}
                    </div>
                    <ButtonRefresh href="/dashboard/collaborator" />
                    <Link href="/dashboard/collaborator/new" className="bg-blue-500 px-4 py-1 rounded text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                        Novo Colaborador
                    </Link>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10">
                {currentCollaborators.map((item) => (
                    <article key={item.id} className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 hover:scale-105 duration-300">
                        <h2>
                            <a className="font-bold">Nome:</a> {item.name}
                        </h2>
                        <p>
                            <a className="font-bold">Email:</a> {item.email}
                        </p>
                        <p>
                            <a className="font-bold">Telefone:</a> {item.phone}
                        </p>
                        <p>
                            <a className="font-bold">Status:</a> {item.status}
                        </p>
                        <div className="flex gap-3">
                            <button onClick={() => { handleDeleteCollaborator(item.id) }} className="rounded-md bg-red-600 py-1 px-5 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none self-start">
                                Deletar
                            </button>
                            <button onClick={() => { router.push(`/dashboard/collaborator/editar/${item.id}`) }} className="rounded-md bg-blue-600 py-1 px-5 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none self-start">
                                Editar
                            </button>
                        </div>
                    </article>
                ))}
            </div>
            <div className="flex justify-end">
                <Pagination
                    current={currentPage}
                    total={collaborator.length}
                    pageSize={ITEMS_PER_PAGE}
                    onChange={(page) => handlePageChange(page)}
                />
            </div>
        </>
    )
}