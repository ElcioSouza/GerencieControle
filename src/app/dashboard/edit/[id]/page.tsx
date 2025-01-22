import { Container } from "@/components/Container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export default async function EditTicket({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect('/');
  }
  const { id } = params
 
  const tickets = await prisma.ticket.findMany({
    where: {
      id: id
    }
  })
  if (!tickets) {
    redirect('/dashboard');
  }

  async function handleEditTicket(formData: FormData) {
    "use server";
    const name = formData.get('name');
    const description = formData.get('description');
    const status = formData.get('status');
    const id = String(formData.get('id'));
    if (!name || !description || !status || !id) {
      return;
    }
    await prisma.ticket.update({
      where: {
        id: id
      },
      data: {
        name: name as string,
        description: description as string,
        CollaboratorId: tickets[0]?.CollaboratorId as string,
        status: status as string,
        UserId: session?.user.id
      }
    })
   redirect('/dashboard');
  }
const ticketStatus = ["Em andamento", "Fechado","Pendente","Cancelado","Urgente","Baixo"];
  return (
    <Container>
      <main className="flex flex-col mt-9 mb-2">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="bg-gray-900 px-4 py-1 text-white rounded transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
            Voltar
          </Link>
          <h1 className="font-bold text-[26px] md:text-3xl">Atualizar Chamado</h1>
        </div>

        <form className="flex flex-col mt-6" action={handleEditTicket}>
        <input type="text" name="id" defaultValue={id} hidden />
          <div>
            <label className="mb-1 fonte-medium text-lg">Nome do chamado</label>
            <input type="text" name="name" defaultValue={tickets[0]?.name} placeholder="Digite nome do chamado" className="w-full border-2 rounded-md px-2 mb-2 h-11" required />
          </div>
          <div>
            <label className="mb-1 fonte-medium text-lcag">Descreva o problema</label>
            <textarea placeholder="Descreva o problema..." defaultValue={tickets[0]?.description} name="description" className="w-full border-2 rounded-md px-2 mb-2 h-24 resize-none" required></textarea>
          </div>
          <div>
            {tickets.length !== 0 && (
              <>
                <label className="mb-1 fonte-medium text-lg">Selecione o Status</label>
                <select className="w-full border-2 rounded-md px-2 mb-2 h-11 resize-none bg-white" defaultValue={tickets[0]?.status} name="status">
                  {tickets.map(ticket => (
                    <>
                     <option key={ticket.status} value={ticket.status} selected>{ticket.status}</option>
                    {ticketStatus.map(status => (
                      status !== ticket.status && (<option key={status} value={status}>{status}</option>)
                    ))}
                   
                    </>
                  ))}
                </select>

              </>
            )}
          </div>

          {tickets.length === 0 && (
            <Link href="/dashboard/new">
              Você ainda não tem nenhum colaborador, <span className="text-blue-500 font-medium"> Cadastrar Colaborador</span>
            </Link>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 h-11 rounded-md my-4 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            disabled={tickets.length === 0}
          >
            Alterar Chamado
          </button>
        </form>
      </main>
    </Container>
  );
}   