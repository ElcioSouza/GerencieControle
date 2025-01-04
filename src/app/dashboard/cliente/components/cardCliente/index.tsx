"use client";
import { ClienteProps } from "@/utils/cliente.type";
import { useRouter } from "next/navigation";
import prisma from "@/lib/prisma";

export function CardCliente({ cliente }: { cliente: ClienteProps }) {
    const router = useRouter();
    async function handleDeleteCliente() {
        try {
            if (confirm("Deseja deletar o cliente?")) {
                const response = await fetch(`/api/cliente?id=${cliente.id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const result = await response.json();
                if(result?.pack?.status === "Aberto") {
                    alert(result.pack.message);
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
                <a className="font-bold">Nome:</a> {cliente.name}
            </h2>
            <p>
                <a className="font-bold">Email:</a> {cliente.email}
            </p>
            <p>
                <a className="font-bold">Telefone:</a> {cliente.phone}
            </p>
            <button onClick={handleDeleteCliente} className="bg-red-500 px-4 rounded text-white mt-2 self-start">
                Deletar
            </button>
        </article>
    )
}