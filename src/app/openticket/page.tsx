"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import { FormSchema, FormSchemaData } from "@/app/openticket/schema/formOpenTicketSchema";
import { FiSearch, FiX } from "react-icons/fi";
import {FormTicket} from "./components/FormTicket"
import { ClienteDataInfo } from "@/app/openticket/type";


export default function OpenTicket() {
    const [cliente, setCliente] = React.useState<ClienteDataInfo | null>(null);

    const {
        handleSubmit,
        register,
        control,
        setValue,
        setError,
        formState: { errors },
    } = useForm<FormSchemaData>({
        resolver: zodResolver(FormSchema)
    });

    function handleCleaCliente(){
        setCliente(null);
        setValue("email","")
    }

    async function handleSearchCliente(data: FormSchemaData ){
        const response = await fetch(`/api/clienteopentIcket?email=${data.email}`);
        const result = await response.json();

        if(!result) {
            setError("email", {type:"text", message: "Ops cliente não encontrado"});
            return;
        }

        setCliente({
            id: result?.pack?.data.id,
            name: result?.pack?.data.name
        })
    }
    return (
        <div className="w-full max-w-2xl mx-auto px-2">
            <h1 className="fonte-bold text-3xl text-center mt-24">Abrir chamado</h1>
            <main className="flex flex-col mt-4 mb-2">
                {cliente ? (
                    <div className="flex items-center justify-between gap-3 bg-slate-200 py-6 px-4 rounded border-2">
                        <p className="text-lg"><strong>Cliente Selecionado::</strong> {cliente.name}</p>
                        <button className="h-11 px-2 flex items-center justify-center rounded" onClick={handleCleaCliente}>
                            <FiX size={30} color="#ff2929" />
                        </button>
                    </div>
                ) : (
                    <form className="flex flex-col gap-3 bg-slate-200 py-6 px-2 rounded border-2" onSubmit={handleSubmit(handleSearchCliente)}>
                        <div>
                            <Input
                                placeholder="Digite o email do cliente..."
                                type="text"
                                name="email"
                                control={control}
                                register={register}
                                error={errors.email?.message}
                            />
                            {errors.email?.message && (
                                <p className="text-red-500">{errors.email.message}</p>
                            )}
                        </div>
                        <div className="w-full">
                            <button type="submit" className="w-full bg-blue-500 flex flex-row gap-3 px-2 h-11 items-center justify-center rounded text-white font-bold">
                                Procurar Cliente
                                <FiSearch size={24} color="#fff" />
                            </button>
                        </div>
                    </form>
                )
                }
              {cliente !== null && <FormTicket  cliente={cliente}/>}
            </main>
        </div>
    )
}