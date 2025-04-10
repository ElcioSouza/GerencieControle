"use client";
import { Container } from '@/components/Container';
import { authOptions } from '@/lib/auth';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export function DashboardHeader() {
    const {data, status} = useSession();
    return (
        <Container>
            <div className="w-full bg-gray-900 my-4 p-3 flex gap-4 items-center rounded">
                <Link href="/dashboard" className="text-white hover:font-bold duration-300">
                    Chamados
                </Link>
                <Link href="/dashboard/collaborator" className="text-white hover:font-bold duration-300">
                    {data?.user.origin === "COLLABORATOR" ? "Perfil" : "Colaborador"}
                </Link>
            </div>
        </Container>
    );
}