"use client";
import React from 'react';
import { FiChrome } from 'react-icons/fi';
import { IoLockClosedOutline, IoLogInOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { LuBuilding2 } from "react-icons/lu";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import { FormUserSchema, FormSchemaUserData } from "@/public/register/scheme/formUserSchema";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/Input';
import Link from 'next/link';

export default function CreateUser() {
      const {
          handleSubmit,
          register,
          control,
          setValue,
          setError,
          formState: { errors },
      } = useForm<FormSchemaUserData>({
          resolver: zodResolver(FormUserSchema),
      });
  const router = useRouter()
  const handleSubmitCreate = async (data: FormSchemaUserData) => {
       if(data.password !== data.passwordconfirm) {
        setError("passwordconfirm", { type: "email", message: "As senhas não conferem" });
        return;
      }
      const result = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await result.json();

      if (response.error) {
        setError("email", { type: "email", message: response.error });
        toast.success(response.error, { theme: "colored"});
      } 
      if (response) {
        toast.success("Cadastro realizado com sucesso!", { theme: "colored"});
        router.replace("/login");
      }
  };

  async function handleCreateGoogle() {
    await signIn("google");
    router.replace("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <ToastContainer />
      <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-xl p-4">
        <div className="text-center">
          <div className="flex justify-center">
            <LuBuilding2 className="h-12 w-12 text-blue-500" />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Gerencie Controle</h2>
          <p className="mt-2 text-sm text-gray-600">
           faço seu cadastro para acessar o sistema
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleSubmitCreate)}>
          <div className="space-y-4">
          <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdOutlineEmail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                    type="text"
                    name="name"
                    register={register}
                    control={control}
                    error={errors.name?.message}
                    placeholder="Digite seu nome"
                />
                {errors.name && (
                    <p className="text-red-500">{errors.name?.message}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdOutlineEmail className="h-5 w-5 text-gray-400" />
                </div>
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoLockClosedOutline className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                    type="password"
                    name="password"
                    register={register}
                    control={control}
                    error={errors.password?.message}
                    placeholder="Digite sua senha"
                />
                {errors.password && (
                    <p className="text-red-500">{errors.password?.message}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Confirmar Senha
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoLockClosedOutline className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                    type="password"
                    name="passwordconfirm"
                    register={register}
                    control={control}
                    error={errors.passwordconfirm?.message}
                    placeholder="Confirmar sua senha"
                />
                {errors.passwordconfirm && (
                    <p className="text-red-500">{errors.passwordconfirm?.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            {/*             <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Lembrar-me
              </label>
            </div>
 */}
{/*             <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Esqueceu sua senha?
              </a>
            </div> */}
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-medium transition-colors duration-150"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <IoLogInOutline className="h-5 w-5 text-blue-500 group-hover:text-blue-400" />
            </span>
            Cadastrar
          </button>
        </form>
        <button
          onClick={handleCreateGoogle}
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 transition-colors"
        >
          <FiChrome className="w-5 h-5 text-blue-500" />
          Cadastrar com Google
        </button>
           <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Ja possuir conta?{' '}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
             login
            </Link>
          </p>
        </div> 
      </div>
    </div>
  );
}

