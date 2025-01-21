import { Container } from "@/components/Container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CardCollaborator } from "./components/cardCollaborator";
import prisma from "@/lib/prisma";
import { ButtonRefresh } from "../components/buttonrefresh";

export default async function Collaborator() {
        const session = await getServerSession(authOptions);
        if(!session || !session.user) {
            redirect('/');
        }

        const collaboratores = await prisma.collaborator.findMany({
            where: {
                UserId: session.user.id
            }
        })
    return (
        <Container>
           <main className="mt-9 mb-2">
              <div className="flex items-center justify-between">
                 <h1 className="text-3xl font-bold">Meus Colaboradores</h1>
                 <div className="flex items-center gap-3">
                    <ButtonRefresh href="/dashboard/collaborator" />
                    <Link href="/dashboard/collaborator/new" className="bg-blue-500 px-4 py-1 rounded text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                        Novo Colaborador 
                    </Link>
                 </div>
              </div>

              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-8 my-8">
              {collaboratores.map(collaborator => (
                  <CardCollaborator key={collaborator.id} collaborator={collaborator} />    
              ))}
              </section>

              {collaboratores.length === 0 && (
                  <p className="text-gray-400 mt-4">Nenhum Colaborador cadastrado</p>
              )}
              
           </main>
        </Container>
    );
}   