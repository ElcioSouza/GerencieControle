"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import { FormClientSchema, FormClientSchemaData } from "@/app/dashboard/cliente/schemas/formClientSchema";

export function NewClienteForm({ UserId } : {UserId: string}) {
    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
    } = useForm<FormClientSchemaData>({
        resolver: zodResolver(FormClientSchema),
        defaultValues: {
            phone: "",
          },
    });
    const router = useRouter();

    async function handleRegisterCliente(data: FormClientSchemaData) {
        const response = await fetch("/api/cliente", {
            method: "POST",
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                phone: data.phone,
                address: data.address ? data.address : "",
                UserId: UserId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }); 
        const result = await response.json();
        console.log(result);
        router.replace("/dashboard/cliente");
        router.refresh();
    }

    return (
        <form className="flex flex-col mt-6" onSubmit={handleSubmit(handleRegisterCliente)}>

            <div>
                <label className="mb-1 text-lg font-medium">Nome completo</label>
                <Input
                    type="text"
                    name="name"
                    register={register}
                    control={control}
                    error={errors.name?.message}
                    placeholder="Digite o nome completo"
                />
                {errors.name && (
                    <p className="text-red-500">{errors.name?.message}</p>
                )}
            </div>

            <div className="flex gap-2 my-2 flex-col sm:flex-row">

                <div className="flex-1">
                    <label className="mb-1 text-lg font-medium">Telefone</label>
                    <Input
                        type="tel"
                        name="phone"
                        register={register}
                        control={control}
                        error={errors.phone?.message}
                        placeholder="Digite o telefone"
                        mask="(99)99999-9999"
                    />
                    {errors.phone && (
                        <p className="text-red-500">{errors.phone?.message}</p>
                    )}
                </div>

                <div className="flex-1">
                    <label className="mb-1 text-lg font-medium">Email</label>
                    <Input
                        type="email"
                        name="email"
                        register={register}
                        control={control}
                        error={errors.email?.message}
                        placeholder="Digite seu email"
                    />
                    {errors.email && (
                        <p className="text-red-500">{errors.email?.message}</p>
                    )}
                </div>
            </div>
            <div>
                <label className="mb-1 text-lg font-medium">Endereço completo</label>
                <Input
                    type="text"
                    name="address"
                    register={register}
                    control={control}
                    error={errors.address?.message}
                    placeholder="Digite o endereço do cliente"
                />
                {errors.address && (
                    <p className="text-red-500">{errors.address?.message}</p>
                )}
            </div>
            <div>
                <button 
                type="submit"
                className="w-full bg-blue-500 my-4 px-2 h-11 rounded text-white font-bold "
                >
                    Cadastrar
                </button>
            </div>
        </form>
    )
}