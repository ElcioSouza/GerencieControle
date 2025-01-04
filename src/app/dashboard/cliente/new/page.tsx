import { Container } from "@/components/Container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { NewClienteForm } from "../components/newClienteForm";

export default async function NewCliente() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        redirect('/');
    }
    return (
        <Container>
            <main className="flex flex-col mt-9 mb-2">
                <div className="flex items-center gap-3">
                    <Link href="/dashboard/cliente" className="bg-gray-900 px-4 py-1 text-white rounded">
                      Voltar
                    </Link>
                    <h1 className="text-3xl font-bold">Novo Cliente</h1>
                </div>

                <NewClienteForm  UserId={session.user.id} />
            </main>
        </Container>

    )
}