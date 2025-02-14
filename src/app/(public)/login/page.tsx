"use client";
import React from 'react';
import { FiChrome } from 'react-icons/fi';
import { IoLockClosedOutline, IoLogInOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { LuBuilding2 } from "react-icons/lu";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import { FormSchemaUserData, FormSchemaUser } from "@/app/(public)/login/scheme/formUserSchema"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/Input';
import Link from 'next/link';

export default function Login() {
      const {
          handleSubmit,
          register,
          control,
          setValue,
          setError,
          formState: { errors },
      } = useForm<FormSchemaUserData>({
          resolver: zodResolver(FormSchemaUser),
          defaultValues: {
              email: "elcio.monico@gmail.com",
              password: "@@Elcio@@90",
          }
      });
  const router = useRouter()
  const handleSubmitLogin = async (data: FormSchemaUserData) => {

    const result = await signIn("credentials", {
      ...data,
      redirect: false
    });
    
    if (result?.error) {
     toast.error(result.error, { theme: "colored"});
    }
    if (result?.ok) {
      toast.success("Login realizado com sucesso!", { theme: "colored" });
      router.replace("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <ToastContainer />
      <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center">
          <div className="flex justify-center">
            <LuBuilding2 className="h-12 w-12 text-blue-500" />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Gerencie Controle</h2>
          <p className="mt-2 text-sm text-gray-600">
            Faça login para acessar sua conta
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleSubmitLogin)}>
          <div className="space-y-4">
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
            Entrar
          </button>
        </form>
        <button
          onClick={() => signIn("google")}
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 transition-colors"
        >
          <FiChrome className="w-5 h-5 text-blue-500" />
          Entrar com Google
        </button>
           <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Não tem uma conta?
            <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Cadastre-se
            </Link>
          </p>
        </div> 
      </div>
    </div>
  );
}

