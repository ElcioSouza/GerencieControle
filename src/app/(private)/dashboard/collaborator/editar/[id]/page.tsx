'use client';
import { Container } from "@/components/Container";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Input";
import { redirect, useRouter } from "next/navigation";
import { FormEditCollaboratorSchema, FormEditCollaboratorSchemaData } from "@/app/(private)/dashboard/collaborator/schemas/formEditCollaboratorSchema";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, useSession,getSession } from "next-auth/react";
import { authOptions } from "@/lib/auth";

interface collaborator {
    name: string;
    email: string;
    lastName: string;
    password: string;
    phone: string;
    address: string;
    status: string;
}
interface listCollaboratorProp {
    collaborator: collaborator;
    userId: string;
}
export default  function EditCollaborator({ params }: { params: { id: string } }) {       
    const [listCollaborator, setListCollaborator] = useState<listCollaboratorProp>();
    const {data: session,update} = useSession();
    console.log(session);
    const id = params.id;

    useEffect(() => {
        async function fetchCollaborator ()  {
            if (!id) return;
            try {
                
                const response = await fetch(`/api/collaboratorlist?id=${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                const result = await response.json();
                setListCollaborator(result?.pack.data);
            } catch (error) {
                console.error("Erro ao procurar o colaborador:", error);
            }
        }

        fetchCollaborator();
    }, []);
    const {
        handleSubmit,
        register,
        control,
        setError,
        formState: { errors },
    } = useForm<FormEditCollaboratorSchemaData>({
        resolver: zodResolver(FormEditCollaboratorSchema),
       values: {
        email: listCollaborator?.collaborator.email as string,
        name: listCollaborator?.collaborator.name as string,
        lastName: listCollaborator?.collaborator.lastName as string,
        phone: listCollaborator?.collaborator.phone as string,
        password: "",
        address: listCollaborator?.collaborator.address as string,
        status: listCollaborator?.collaborator.status as string
    }
    });
    const router = useRouter();

    async function handleEditarCollaborator(data: FormEditCollaboratorSchemaData) {
        const response = await fetch("/api/collaborator?id="+id, {
            method: "PUT",
            body: JSON.stringify({
                name: data.name,
                lastName: data.lastName,
                password: data.password,
                email: data.email,
                phone: data.phone,
                address: data.address ? data.address : "",
                status: "Ativo",
                userId: listCollaborator?.userId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const result = await response.json();
        if (session?.user.origin === "COLLABORATOR" && session?.user.status === "Ativo") {	
         await signIn("credentials", {
            redirect: false,
            email: result.pack.data.email,
            password: data.password,
            status: "Ativo"
          }); 
          await update();
        }
          router.refresh();

        if (result.error) {
            setError("email", { type: "text", message: result.error })
            return;
        }
        if (result?.pack?.status === "Em andamento" || result?.pack?.status === "Urgente" || result?.pack?.status === "Baixo" || result?.pack?.status === "Pendente") {
            alert(result?.pack?.error);
        } else {

            router.push("/dashboard/collaborator");
            router.refresh();
        }
    }
    return (
        <Container>
            <main className="flex flex-col mt-9 mb-2">
                <div className="flex items-center gap-3">
                    <Link href="/dashboard/collaborator" className="bg-gray-900 px-4 py-1 text-white rounded transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                        Voltar
                    </Link>
                    <h1 className="font-bold text-[26px] md:text-3xl">Atualizar Colaborador</h1>
                </div>

                <form className="flex flex-col mt-6" onSubmit={handleSubmit(handleEditarCollaborator)}>
                    <input type="text" name="id" hidden />
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
                        placeholder="Digite sua senha"
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

                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-bold py-2 h-11 rounded-md my-4 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    >
                        Alterar Colaborador
                    </button>
                </form>
            </main>
        </Container>
    );
}