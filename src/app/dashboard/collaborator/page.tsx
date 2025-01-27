import { Container } from "@/components/Container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CardCollaborator } from "./components/cardCollaborator";
import prisma from "@/lib/prisma";
import { ButtonRefresh } from "../components/buttonrefresh";
import { colllaboratorFactory } from "@/app/factories/ColllaboratorFactory";
import { FiSearch } from "react-icons/fi";

export default async function Collaborator() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect('/');
  }

/*   const [collaboratorQuery, total] = await Promise.all([
    prisma.collaborator.findMany({
      where: {
        UserId: session.user.id
      },
      orderBy: {
        created_at: "desc"
      }
    }),
    prisma.collaborator.count({
      where: {
        id: session.user.id
      }
    })
  ]); */

  const [collaboratorQuery, total] = await Promise.all([
    prisma.collaborator.findMany({
      where: {
          UserId: session.user.id
      },
      skip: 0, // offset
      take: 5, // limit
      orderBy: {
        created_at: "desc"
      }
    }),
    prisma.collaborator.count({
      where: {
          UserId: session.user.id
      }
    })
  ]);
  
  const result = {
    data: collaboratorQuery,
    total: total
  };
  const collaborator = colllaboratorFactory(result.data);
  return (
    <Container>
      <main className="mt-9 mb-2">
        <section>
          <CardCollaborator collaborator={collaborator} total={total} />
        </section>

        {collaboratorQuery.length === 0 && (
          <p className="text-gray-400 mt-4">Nenhum Colaborador cadastrado</p>
        )}

      </main>
    </Container>
  );
}   