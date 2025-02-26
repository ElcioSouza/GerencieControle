
import { Container } from "@/components/Container";
import { NewFormTickets } from "@/private/dashboard/components/newformtickets";

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



  return (
    <Container>
      <main className="flex flex-col mt-9 mb-2">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="bg-gray-900 px-4 py-1 text-white rounded transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
            Voltar
          </Link>
          <h1 className="text-3xl font-bold">Novo Chamado</h1>
        </div>
        <NewFormTickets collaboratores={collaboratores}  />
      </main>
    </Container>
  );
}   