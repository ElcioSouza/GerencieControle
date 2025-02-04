"use client"
import { signIn } from "next-auth/react"
import { Feature } from '@/components/Features';
import { Hero } from '@/components/Hero';
import { Benefits } from '@/components/Benefits';
import { Cta } from "@/components/cta";
import { Footer } from "@/components/Footer";
export default function Home() {
  return (
    <>
      <main>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <Hero signIn={signIn} />
            <Feature />
            <Cta signIn={signIn} />
            <Benefits />
          </div>
          <Footer />
        </div>
      </main>
    </>

  );
}
