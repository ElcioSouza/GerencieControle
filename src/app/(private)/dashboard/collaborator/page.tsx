import { Container } from "@/components/Container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { CardCollaborator } from "@/app/(private)/dashboard/collaborator/components/cardCollaborator";
import prisma from "@/lib/prisma";
import { colllaboratorFactory } from "@/app/factories/ColllaboratorFactory";
export default async function Collaborator() {
  const session = await getServerSession(authOptions);
  
  const [collaboratorQuery, total] = await Promise.all([
    prisma.collaborator.findMany({
      where: {
        ...(session?.user.origin === "USER"
          ? { UserId: session?.user.id } 
          : { id: session?.user.id }) 
      },
      skip: 0, // offset
      take: 6, // limit
      orderBy: {
        created_at: "desc"
      }
    }),
    prisma.collaborator.count({
      where: {
          UserId: session?.user.id
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
          <CardCollaborator collaborator={collaborator} total={total} session={session} />
        </section>
      </main>
    </Container>
  );
}   