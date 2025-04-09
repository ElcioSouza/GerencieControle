"use client"
import { signIn, useSession } from "next-auth/react"
import { Feature } from '@/components/Features';
import { Hero } from '@/components/Hero';
import { Benefits } from '@/components/Benefits';
import { Cta } from "@/components/cta";
import { Footer } from "@/components/Footer";
import {useLayoutEffect,useState} from "react";
import { Header } from "@/components/Header";
export default function Home() {
  const { data, status} = useSession();

  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    status === "unauthenticated" && loading && setLoading(false);
  }, [status]);
  return (
    <>
      <Header />
      <main>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 md:px-0 lg:px-0 py-20">
            <Hero signIn={signIn} status={status} loading={loading} />
            <Feature />
            <Cta signIn={signIn} status={status}  loading={loading} />
            <Benefits />
          </div>
          <Footer status={status}  loading={loading} />
        </div>
      </main>
    </>

  );
}
