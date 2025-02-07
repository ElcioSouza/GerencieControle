"use client";
import { IoIosClose } from "react-icons/io";
import { useContext, useRef, MouseEvent } from "react"
import { ModalContext } from "@/providers/modal"

export function ModalTicket() {
    const { handleModalVisible, ticket } = useContext(ModalContext)
    const modalRef = useRef<HTMLDivElement | null>(null);
    //console.log();
    const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            handleModalVisible()
        }
    }
    return (
        <section className="z-[99] absolute bg-gray-900/80 w-full min-h-screen" onClick={handleModalClick}>
            <div className="absolute inset-0 flex items-center justify-center">
                <div ref={modalRef} className="bg-white shadow-lg w-4/5 md:w-1/2 max-w-2xl p-3 rounded">
                    <div className="flex item-center justify-between mb-4">
                        <h1 className="font-bold text-lg md:-text-2xl">Detalhe do chamado</h1>
                        <button className="bg-red-500 p-1 px-2 text-white rounded" onClick={handleModalVisible}>
                            <IoIosClose size={24} color="#fff" />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                        <h2 className="font-bold">Nome:</h2>
                        <p>{ticket?.ticket.name}</p>
                    </div>
                    <div className="flex flex-wrap flex-col gap-1 mb-2">
                        <h2 className="font-bold">Descrição:</h2>
                        <p>{ticket?.ticket.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                        <h2 className="font-bold">Data de Abertura:</h2>
                        <p>{ticket?.ticket.created_at ? new Date(ticket.ticket.created_at).toLocaleDateString("pt-BR") : "Data inválida"}</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                        <h2 className="font-bold">Data de Atualização:</h2>
                        <p>{ticket?.ticket.updated_at ? new Date(ticket.ticket.updated_at).toLocaleDateString("pt-BR") : "Data inválida"}</p>
                    </div>
                    <div className="w-full border-b-[1.5px] my-4"></div>
                    <h1 className="font-bold text-lg mb-4">Detalhe do Colaborador</h1>
                    <div className="flex flex-wrap gap-1 mb-2">
                        <h2 className="font-bold">Nome:</h2>
                        <p>{ticket?.collaborator?.name}</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                        <h2 className="font-bold">Telefone:</h2>
                        <p>{ticket?.collaborator?.phone}</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                        <h2 className="font-bold">Email:</h2>
                        <p>{ticket?.collaborator?.email}</p>
                    </div>
                    {ticket?.collaborator?.address && (
                        <div className="flex flex-wrap gap-1 mb-2">
                            <h2 className="font-bold">Endereço:</h2>
                            <p>{ticket?.collaborator?.address}</p>
                        </div>
                    )}
                    <div className="flex flex-wrap gap-1 mb-2">
                        <h2 className="font-bold">Data de Abertura:</h2>
                        <p>{ticket?.collaborator?.created_at ? new Date(ticket.collaborator.created_at).toLocaleDateString("pt-BR") : "Data inválida"}</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                        <h2 className="font-bold">Data de Atualização:</h2>
                        <p>{ticket?.collaborator?.updated_at ? new Date(ticket.collaborator.updated_at).toLocaleDateString("pt-BR") : "Data inválida"}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
