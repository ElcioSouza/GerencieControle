"use client";
import { useState } from "react";
import { CollaboratorProps } from "@/utils/cardCollaborator.type";
import { useRouter } from "next/navigation";
import { Pagination } from 'antd';

export function CardCollaborator({ collaborator }: { collaborator: CollaboratorProps[] }) {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

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
        console.log(page);
    }
    return (
        <>
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