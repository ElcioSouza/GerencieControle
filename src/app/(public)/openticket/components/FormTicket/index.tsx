"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Input";
import { FormSchemaTicket, FormSchemaTicketData } from "@/app/(public)/openticket/schema/formTicketSchema";
import { CollaboratorDataInfo } from "@/app/(public)/openticket/type";

export interface collaboratorDataInfoProps {
    collaborator: CollaboratorDataInfo | null
}

export function FormTicket({collaborator}: collaboratorDataInfoProps) {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormSchemaTicketData>({
        resolver: zodResolver(FormSchemaTicket)
    })

    async function handleRegisterTicket(data: FormSchemaTicketData) {
        const response = await fetch("/api/collaboratoropenticket", {
            method: "POST",
            body: JSON.stringify({
                name: data.name,
                description: data.description,
                CollaboratorId: collaborator?.id
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        setValue("name", "");
        setValue("description", "");
    }
    return (
        <form className="bg-slate-200 mt-6 px-4 py-6 rounded border-2" onSubmit={handleSubmit(handleRegisterTicket)}>
            <div className="my-4">
                <label className="my-4 font-medium text-lg block">Nome do chamado:</label>
                <Input
                    name="name"
                    control={register}
                    register={register}
                    error={errors.name?.message}
                    type="text"
                    placeholder="Digite o nome do chamado"
                />

                {errors.name?.message && (
                    <p className="text-red-500 my-1">{errors.name.message}</p>
                )}
            </div>
            <div className="my-4">
                <textarea
                    className="w-full border-2 rounded-md h-24 resize-none mb-2 px-2"
                    placeholder="Descreve o seu problema..."
                    id="description"
                    {...register("description")}
                ></textarea>

                {errors.description?.message && (
                    <p className="text-red-500 my-1">{errors.description.message}</p>
                )}
            </div>
            <div className="my-4">
                <button type="submit" className="bg-blue-500 roudeed-md w-full h-11 px-2 text-white font-bold transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                    Cadastrar
                </button>
            </div>
        </form>
    )
}