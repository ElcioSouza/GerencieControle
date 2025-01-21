"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import { FormCollaboratorSchema, FormCollaboratorSchemaData } from "@/app/dashboard/collaborator/schemas/formCollaboratorSchema";

export function NewCollaboratorForm({ UserId }: { UserId: string }) {
    const {
        handleSubmit,
        register,
        control,
        setError,
        formState: { errors },
    } = useForm<FormCollaboratorSchemaData>({
        resolver: zodResolver(FormCollaboratorSchema),
        defaultValues: {
            phone: "",
        },
    });
    const router = useRouter();
    async function handleRegisterCollaborator(data: FormCollaboratorSchemaData) {
        const response = await fetch("/api/collaborator", {
            method: "POST",
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                phone: data.phone,
                address: data.address ? data.address : "",
                status: "Ativo",
                UserId: UserId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const result = await response.json();
        if (result.error) {
            setError("email", { type: "text", message: result.error })
            return;
        }
        router.push("/dashboard/collaborator"); 
    }

    return (
        <form className="flex flex-col mt-6" onSubmit={handleSubmit(handleRegisterCollaborator)}>

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
                <div>
                    <div>
                        <label className="mb-1 text-lg font-medium">Endereço completo</label>
                        <Input
                            type="text"
                            name="address"
                            register={register}
                            control={control}
                            error={errors.address?.message}
                            placeholder="Digite o endereço do colaborador"
                        />
                        {errors.address && (
                            <p className="text-red-500">{errors.address?.message}</p>
                        )}
                    </div>
                </div>
            </div>
            <div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 my-4 px-2 h-11 rounded text-white font-bold transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                    Cadastrar Colaborador
                </button>
            </div>
        </form>
    )
}