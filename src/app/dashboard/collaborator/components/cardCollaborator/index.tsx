"use client";
import { CollaboratorProps } from "@/utils/collaborator.type";
import { useRouter } from "next/navigation";

export function CardCollaborator({ collaborator }: { collaborator: CollaboratorProps }) {
    const router = useRouter();
    async function handleDeleteCollaborator() {
        try {
            if (confirm("Deseja deletar o colaborador?")) {
                const response = await fetch(`/api/collaborator?id=${collaborator.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const result = await response.json();
                console.log(result);
                if (result?.pack?.status === "Em andamento" || result?.pack?.status === "Urgente" || result?.pack?.status === "Baixo" || result?.pack?.status === "Pendente") {
                    alert(result?.pack?.error);
                }
                router.refresh();
            }
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 hover:scale-105 duration-300">
            <h2>
                <a className="font-bold">Nome:</a> {collaborator.name}
            </h2>
            <p>
                <a className="font-bold">Email:</a> {collaborator.email}
            </p>
            <p>
                <a className="font-bold">Telefone:</a> {collaborator.phone}
            </p>
            <p>
                <a className="font-bold">Status:</a> {collaborator.status}
            </p>
            <div className="flex gap-3">
                <button onClick={handleDeleteCollaborator} className="rounded-md bg-red-600 py-1 px-5 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none self-start">
                    Deletar
                </button>
                <button onClick={()=>{router.push(`/dashboard/collaborator/editar/${collaborator.id}`)}} className="rounded-md bg-blue-600 py-1 px-5 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none self-start">
                    Editar
                </button>
            </div>
        </article>
    )
}