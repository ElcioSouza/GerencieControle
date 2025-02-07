"use client";

import { CollaboratorProps } from "@/utils/cardCollaborator.type";
import { useRouter } from "next/navigation";

interface collaboratorCardProps {
     collaborator: CollaboratorProps,
     handleDelete: (id: string) => void 
}
export function CollaboratorCard({ collaborator, handleDelete }: collaboratorCardProps) {
    const router = useRouter();
    return (
        <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 hover:scale-105 duration-300">
            <h2><strong>Nome:</strong> {collaborator.name}</h2>
            <p><strong>Email:</strong> {collaborator.email}</p>
            <p><strong>Telefone:</strong> {collaborator.phone}</p>
            <p><strong>Data de Cadastro:</strong> {collaborator.created_at ? new Date(collaborator.created_at).toLocaleDateString("pt-BR") : "Data inválida"}</p>
            <p><strong>Status:</strong> {collaborator.status}</p>

            <div className="flex gap-3">
                <button onClick={() => handleDelete(collaborator.id)} className="rounded-md bg-red-600 py-1 px-5 text-white hover:bg-red-700">Deletar</button>
                <button onClick={() => router.push(`/dashboard/collaborator/editar/${collaborator.id}`)} className="rounded-md bg-blue-600 py-1 px-5 text-white hover:bg-blue-700">Editar</button>
            </div>
        </article>
    );
}