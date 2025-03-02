import { Container } from "@/components/Container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { EditFormTickets } from "@/private/dashboard/components/editformtickets";

export default async function EditTicket({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const { id } = params
 
  const ticket = await prisma.ticket.findMany({
    where: {
      id: id
    }
  })
  return (
    <Container>
      <main className="flex flex-col mt-9 mb-2">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="bg-gray-900 px-4 py-1 text-white rounded transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
            Voltar
          </Link>
          <h1 className="font-bold text-[26px] md:text-3xl">Atualizar Chamado</h1>
        </div>
        <EditFormTickets tickets={ticket} ticketId={id} />
      </main>
    </Container>
  );
}   