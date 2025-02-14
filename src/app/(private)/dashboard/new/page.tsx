import { Container } from "@/components/Container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export default async function NewTicket() {
  const session = await getServerSession(authOptions);

  const collaboratores = await prisma.collaborator.findMany({
    where: {
      UserId: session?.user.id
    }
  })

  async function handleRegisterTicket(formData: FormData) {
    "use server";
    const name = formData.get('name');
    const description = formData.get('description');
    const collaboratorId = formData.get('collaborator');
    if (!name || !description || !collaboratorId) {
      return;
    }
    await prisma.ticket.create({
      data: {
        name: name as string,
        description: description as string,
        CollaboratorId: collaboratorId as string,
        status: "Em andamento",
        UserId: session?.user.id
      }
    })
    //redirect('/dashboard');
  }

  return (
    <Container>
      <main className="flex flex-col mt-9 mb-2">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="bg-gray-900 px-4 py-1 text-white rounded transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
            Voltar
          </Link>
          <h1 className="text-3xl font-bold">Novo Chamado</h1>
        </div>

        <form className="flex flex-col mt-6" action={handleRegisterTicket}>
          <div>
            <label className="mb-1 fonte-medium text-lg">Nome do chamado</label>
            <input type="text" name="name" placeholder="Digite nome do chamado" className="w-full border-2 rounded-md px-2 mb-2 h-11" required />
          </div>
          <div>
            <label className="mb-1 fonte-medium text-lg">Descreva o problema</label>
            <textarea placeholder="Descreva o problema..." name="description" className="w-full border-2 rounded-md px-2 mb-2 h-24 resize-none" required></textarea>
          </div>
          <div>
            {collaboratores.filter(Collaborator => Collaborator.status !== "Inativo").length > 0 ? (
              <div>
                <label className="mb-1 fonte-medium text-lg">Selecione o Colaborador</label>
                <select className="w-full border-2 rounded-md px-2 mb-2 h-11 resize-none bg-white" name="collaborator">
                  {collaboratores.map(collaborator => (
                    collaborator.status !== 'Inativo' && <option key={collaborator.id} value={collaborator.id}>{collaborator.name}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <div className="mb-1 text-lg font-medium">
                  Nenhum colaborador cadastrado? <Link href="/dashboard/collaborator/new" className="text-blue-500 font-semibold">Cadastre um agora</Link>
                </div>
              </div>
            )}

          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 h-11 rounded-md my-4 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            disabled={collaboratores.length === 0}
          >
            Cadastrar Chamado
          </button>
        </form>
      </main>
    </Container>
  );
}   