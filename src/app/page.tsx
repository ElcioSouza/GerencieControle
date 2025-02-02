"use client"
import Header from "@/components/Header";
import { signIn, signOut, useSession } from "next-auth/react"
import { Footer } from "./dashboard/components/Footer";
import { Cta } from './dashboard/components/cta';
import { Feature } from '@/components/Features';
import { Hero } from '@/components/Hero';
import { Benefits } from '@/components/Benefits';
export default function Home() {
  return (
    <>
      <Header />
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
