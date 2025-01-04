'use client';
import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {ContactSchema} from "@/constant/SchemaYup";
import Link from "next/link";

export default function Home() {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [sendFormEmail, setSendFormEmail] = React.useState(true);
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ContactSchema),
    defaultValues: {
      phone: "",
    },
  });

  return (
    <main className="flex items-center flex-col justify-center min-h-[calc(100vh-80px)]">
      <h2 className="font-medium text-2xl mb-2">Gerencie sua empresa</h2>
      <h1 className="font-medium text-3xl mb-8 text-blue-600 md:text-4xl">Atendimentos, Clientes</h1>
      <Image 
        src="img/Hero.svg" 
        alt="hero"
        width={600}
        height={600}
        className="max-w-sm md:max-w-xl"
      />
  </main>
  );
}
