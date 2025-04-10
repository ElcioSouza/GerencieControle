"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchemaTicket, FormSchemaTicketData, } from "@/app/(private)/dashboard/components/newformtickets/schemas/editFormTicketSchema";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ticket {
  id: string;
  name: string;
  address: string | null;
  status: string | null;
}
interface NewFormTicketsProps {
  collaboratores: ticket[];
  user?: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    origin?: string | null;
  }
};

export function NewFormTickets({ collaboratores, user}: NewFormTicketsProps) {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormSchemaTicketData>({
    resolver: zodResolver(FormSchemaTicket),
  });
  async function handleRegisterTicket(data: FormSchemaTicketData) {
    console.log("entrou")
    const response = await fetch("/api/dashboardticket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    const result = await response.json();
    
    console.log("nao cadastrada",result);
    if(result) {
      router.refresh();
      router.replace("/dashboard");
    }
  }
return <form className="flex flex-col mt-6" onSubmit={handleSubmit(handleRegisterTicket)} >
  <div>
    <label className="mb-1 fonte-medium text-lg">Nome do chamado</label>
    <input type="text" placeholder="Digite nome do chamado" className="w-full border-2 rounded-md px-2 mb-2 h-11" {...register("name")} />
    {errors.name && <span className="text-red-500">{errors.name.message}</span>}
  </div>
  <div>
    <label className="mb-1 fonte-medium text-lg">Descreva o problema</label>
    <textarea placeholder="Descreva o problema..." className="w-full border-2 rounded-md px-2 mb-2 h-24 resize-none" {...register?.("description")}></textarea>
    {errors.description && <span className="text-red-500">{errors.description.message}</span>}
  </div>
  <div>
 
    {collaboratores.filter(Collaborator => Collaborator.status !== "Inativo").length > 0 ? <div>
 {user?.origin === "USER" ? <label className="mb-1 fonte-medium text-lg">Colaborador</label> : ''}
      <select className={`w-full border-2 rounded-md px-2 mb-2 h-11 resize-none bg-white ${user?.origin === "COLLABORATOR" ? 'hidden' : ''}`} {...register?.("collaboratorId")}>
        <option value="">Selecione um colaborador</option>
        {collaboratores.map(collaborator => collaborator.status !== 'Inativo' && <option key={collaborator.id} value={collaborator.id} selected={user?.origin === "COLLABORATOR"? true : false}>{collaborator.name}</option>)}
      </select>
      {errors.collaboratorId && <span className="text-red-500">{errors.collaboratorId.message}</span>}
    </div> : ''}

    {
       collaboratores.length === 0 ? <div>
      <div className="mb-1 text-lg font-medium">
        Nenhum colaborador cadastrado? <Link href="/dashboard/collaborator/new" className="text-blue-500 font-semibold">Cadastre um agora</Link>
      </div>
    </div> : ''
    }


  </div>
  <button type="submit" className="bg-blue-500 text-white font-bold py-2 h-11 rounded-md my-4 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" disabled={collaboratores.length === 0}>
    Cadastrar Chamado
  </button>
</form>

}