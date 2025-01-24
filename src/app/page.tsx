import Image from "next/image";
import Header from "@/components/Header";
export default function Home() {
  return (
    <>
      <Header />
      <main className="flex items-center flex-col justify-center min-h-[calc(100vh-80px)]">
        <h2 className="font-medium text-2xl mb-2">Gerencie sua empresa</h2>
        <h1 className="font-medium text-3xl mb-8 text-blue-600 md:text-4xl">Atendimentos, Colaboradores</h1>
        <Image
          src="img/Hero.svg"
          alt="hero"
          width={600}
          height={600}
          className="max-w-sm md:max-w-xl"
        />
      </main>
    </>

  );
}
