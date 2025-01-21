"use client";
import Input from '@/components/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormLoginSchema, FormLoginSchemaData } from '@/app/register/schema/FormLogin';

import React from 'react';
export default function RegisterPage() {
    const {
        handleSubmit,
        register,
        control,
        setError,
        formState: { errors },
    } = useForm<FormLoginSchemaData>({
        resolver: zodResolver(FormLoginSchema),
        defaultValues: {
            phone: "",
        },
    });
    return (
        <main className="flex justify-center items-center min-h-screen bg-[url('/img/bg.jpg')] bg-no-repeat bg-center bg-cover max-w-screen">
        <section className="register w-full max-w-[500px]">
            <div className="absolute w-full h-full z-[0] left-0 top-0 bg-[rgba(0,0,0,0.5)]"></div>
            <div className="bg-[white] shadow-[0_10px_25px_rgba(0,0,0,0.1)] m-2.5 p-10 rounded-[10px] md:scale-[1.2]">
                <div className="box-register">
                    <h2 className="text-center text-[#4a90e2] font-bold text-[28px] mb-[30px]">Cadastrar Usuário</h2>
                    <form className="flex flex-col" method="POST">
                        <div className="relative mb-[25px]">
                            <Input
                                type="text"
                                name="name"
                                className="w-full text-base text-[#333] transition-[border-color] duration-[0.2s] px-0 py-2.5 border-b-[#ddd] border-[none] border-b border-solid focus:border-b-[#4a90e2] outline-none"
                                register={register}
                                control={control}
                                error={errors.name?.message}
                                placeholder="Digite o nome completo"
                            />
                            {errors.name && (
                                <p className="text-red-500">{errors.name?.message}</p>
                            )}
                        </div>
                        <div className="relative mb-[25px]">
                            <Input
                                type="text"
                                name="email"
                                className="w-full text-base text-[#333] transition-[border-color] duration-[0.2s] px-0 py-2.5 border-b-[#ddd] border-[none] border-b border-solid focus:border-b-[#4a90e2] outline-none"
                                register={register}
                                control={control}
                                error={errors.email?.message}
                                placeholder="Digite seu email"
                            />
                            {errors.email && (
                                <p className="text-red-500">{errors.email?.message}</p>
                            )}
                        </div>
                        <div className="relative mb-[25px]">
                            <Input
                                type="text"
                                name="password"
                                className="w-full text-base text-[#333] transition-[border-color] duration-[0.2s] px-0 py-2.5 border-b-[#ddd] border-[none] border-b border-solid focus:border-b-[#4a90e2] outline-none"
                                register={register}
                                control={control}
                                error={errors.password?.message}
                                placeholder="Digite sua senha"
                            />
                            {errors.password && (
                                <p className="text-red-500">{errors.password?.message}</p>
                            )}
                        </div>
                        <button type="submit" className="text-[white] text-base cursor-pointer hover:bg-[#f39c12] transition-[background-color] duration-[0.3s] ease-[ease-in-out] px-5 py-3 rounded-[25px] border-[none] bg-[#4a90e2]">Cadastrar</button>
                    </form>
                    <div className="text-center text-sm mt-5">
                        Já tem uma conta? <a href="#" className="text-[#4a90e2] no-underline font-[bold]">Faça login</a>
                    </div>
                </div>
            </div>
        </section>
        </main>
    );
}
