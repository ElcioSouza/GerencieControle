import { Container } from "@/components/Container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { NewCollaboratorForm } from "@/private/dashboard/collaborator/components/newCollaboratorForm";

export default async function NewColaborador() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        redirect('/');
    }
    return (
        <Container>
            <main className="flex flex-col mt-9 mb-2">
                <div className="flex items-center gap-3">
                    <Link href="/dashboard/collaborator" className="bg-gray-900 px-4 py-1 text-white rounded transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                      Voltar
                    </Link>
                    <h1 className="text-3xl font-bold">Novo Colaborador</h1>
                </div>

                <NewCollaboratorForm  UserId={session.user.id} />
            </main>
        </Container>

    )
}