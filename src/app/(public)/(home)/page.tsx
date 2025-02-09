"use client"
import { signIn, useSession } from "next-auth/react"
import { Feature } from '@/components/Features';
import { Hero } from '@/components/Hero';
import { Benefits } from '@/components/Benefits';
import { Cta } from "@/components/cta";
import { Footer } from "@/components/Footer";
import { authOptions } from "@/lib/auth";
export default function Home() {
  const { data, status} = useSession();
  return (
    <>
      <main>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <Hero signIn={signIn} status={status} />
            <Feature />
            <Cta signIn={signIn} status={status} />
            <Benefits />
          </div>
          <Footer status={status} />
        </div>
      </main>
    </>

  );
}
