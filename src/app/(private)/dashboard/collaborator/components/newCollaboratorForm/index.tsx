"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import { formCreateCollaboratorSchema,formCreateCollaboratorSchemaData } from "@/app/(private)/dashboard/collaborator/schemas/formCreateCollaboratorSchema";

export function NewCollaboratorForm({ UserId }: { UserId: string }) {
    const {
        handleSubmit,
        register,
        control,
        setError,
        formState: { errors },
    } = useForm<formCreateCollaboratorSchemaData>({
        resolver: zodResolver(formCreateCollaboratorSchema),
        defaultValues: {
            phone: "(27)99781-9999",
            password: "123",
            name: "teste",
            email: "teste@teste.com",
            lastName: "teste",
            address: "teste",
        },
    });
    const router = useRouter();

    function sendEmail(data: formCreateCollaboratorSchemaData) {
        console.log("Enviando email");
        const response = fetch("/api/collaboratorsendEmail", {
            method: "POST",
            body: JSON.stringify({
                name: "teste",
                email: "teste@teste.com",
                password: "123",
                lastName: "teste",
                phone: "(27)99781-9999",
                address: "teste",
                status: "Ativo",
                UserId: UserId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response;
    }
    async function handleRegisterCollaborator(data: formCreateCollaboratorSchemaData) {
        console.log(data);
        const result = await sendEmail(data);
        const json = await result.json();
        console.log(json);
        setError("root", { type: "manual", message: json.message });
/*         const response = await fetch("/api/collaborator", {
            method: "POST",
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                password: data.password,
                lastName: data.lastName ? data.lastName : "",
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
        router.replace("/dashboard/collaborator");  */
    }

    return (
        <form className="flex flex-col mt-6" onSubmit={handleSubmit(handleRegisterCollaborator)}>
        {errors.root && <p style={{ color: "red" }}>{errors.root.message}</p>}
            <div className="flex gap-2 my-2 flex-col sm:flex-row">
                <div className="flex-1">
                <label className="mb-1 text-lg font-medium">Nome</label>
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
                <div className="flex-1">
                <label className="mb-1 text-lg font-medium">Sobrenome</label>
                <Input
                    type="text"
                    name="lastName"
                    register={register}
                    control={control}
                    error={errors.lastName?.message}
                    placeholder="Digite o nome completo"
                />
                {errors.name && (
                    <p className="text-red-500">{errors.lastName?.message}</p>
                )}
                </div>
            </div>


            <div className="flex gap-2 my-2 flex-col sm:flex-row">
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
                <div className="flex-1">
                    <label className="mb-1 text-lg font-medium">Senha</label>
                    <Input
                        type="password"
                        name="password"
                        register={register}
                        control={control}
                        error={errors.password?.message}
                        placeholder="Digite seu senha"
                    />
                    {errors.email && (
                        <p className="text-red-500">{errors.password?.message}</p>
                    )}
                </div>
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
                            className="bg-white"
                            mask="(99)99999-9999"
                            
                        />
                        {errors.phone && (
                            <p className="text-red-500">{errors.phone?.message}</p>
                        )}
                    </div>
                    <div className="flex-1">
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