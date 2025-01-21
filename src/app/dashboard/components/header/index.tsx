import { Container } from '@/components/Container';
import Link from 'next/link';

export function DashboardHeader() {
    return (
        <Container>
            <header className="w-full bg-gray-900 my-4 p-3 flex gap-4 items-center rounded">
                <Link href="/dashboard" className="text-white hover:font-bold duration-300">
                    Chamados
                </Link>
                <Link href="/dashboard/collaborator" className="text-white hover:font-bold duration-300">
                    Colaborador
                </Link>
            </header>
        </Container>
    );
}