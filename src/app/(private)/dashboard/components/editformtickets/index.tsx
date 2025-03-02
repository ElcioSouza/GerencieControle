"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEditSchemaTicket, FormEditSchemaTicketData } from "@/private/dashboard/components/editformtickets/schemas/editFormTicketSchema";
import { useRouter } from "next/navigation";
import { StatusTickets } from "@/constant/tickets";

interface ticket {
  name: string;
  description: string;
  status: string;
}
interface EditFormTicketsProps {
  tickets: ticket[];
  ticketId: string;
}

export function EditFormTickets({ tickets,ticketId }: EditFormTicketsProps) {
  const {
    handleSubmit,
    register,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormEditSchemaTicketData>({
    resolver: zodResolver(FormEditSchemaTicket),
    defaultValues: {
      name: tickets[0]?.name || "",
      description: tickets[0]?.description || "",
      status: tickets[0]?.status || "",
    },
  });
  const router = useRouter();

  async function handleEditTicket(data: FormEditSchemaTicketData) {
   const response = await fetch(`/api/dashboardticket?id=${ticketId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    const result = await response.json();
    router.replace("/dashboard");
    router.refresh();
 }


  return (<form className="flex flex-col mt-6" onSubmit={handleSubmit(handleEditTicket)}>
    <div>
      <label className="mb-1 fonte-medium text-lg">Nome do chamado</label>
      <input type="text" placeholder="Digite nome do chamado" className="w-full border-2 rounded-md px-2 mb-2 h-11" {...register?.("name")} />
      {errors.name && <span className="text-red-500">{errors.name.message}</span>}
    </div>
    <div>
      <label className="mb-1 fonte-medium text-lcag">Descreva o problema</label>
      <textarea placeholder="Descreva o problema..." className="w-full border-2 rounded-md px-2 mb-2 h-24 resize-none" {...register?.("description")}></textarea>
      {errors.description && <span className="text-red-500">{errors.description.message}</span>}
    </div>
    <div>
      {tickets.length !== 0 && (
        <>
          <label className="mb-1 fonte-medium text-lg">Selecione o Status</label>
          <select className="w-full border-2 rounded-md px-2 mb-2 h-11 resize-none bg-white"   {...register?.("status")} >
            <option value="">Selecione um status</option>
            {tickets.map(ticket => (
              <option key={ticket.status} value={ticket.status} selected>{ticket.status}</option>
            ))}
            {StatusTickets.map(status =>
              !tickets.some(ticket => ticket.status === status) && (
                <option key={status} value={status}>
                  {status}
                </option>
              )
            )}
          </select>
          {errors.status && <span className="text-red-500">{errors.status.message}</span>}
        </>
      )}
    </div>

    <button
      type="submit"
      className="bg-blue-500 text-white font-bold py-2 h-11 rounded-md my-4 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
    >
      Alterar Chamado
    </button>
  </form>);
}