import { Container } from "@/components/Container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CardCollaborator } from "./components/cardCollaborator";
import prisma from "@/lib/prisma";
import { ButtonRefresh } from "../components/buttonrefresh";
import { colllaboratorFactory } from "@/app/factories/ColllaboratorFactory";

export default async function Collaborator() {
        const session = await getServerSession(authOptions);
        if(!session || !session.user) {
            redirect('/');
        }

        const [collaboratorQuery, total] = await Promise.all([
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
        ]);

     const collaborator = colllaboratorFactory(collaboratorQuery);        
    return (
        <Container>
           <main className="mt-9 mb-2">
              <div className="flex items-center justify-between">
                 <h1 className="font-bold text-[20px] md:text-3xl">Meus Colaboradores</h1>
                 <div className="flex items-center gap-3">
                    {/* <input type="text" placeholder="Buscar colaborador" className="border border-gray-500 rounded px-2 py-1" name="search"  id="search" /> */}
                    <ButtonRefresh href="/dashboard/collaborator" />
                    <Link href="/dashboard/collaborator/new" className="bg-blue-500 px-4 py-1 rounded text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                        Novo Colaborador 
                    </Link>
                 </div>
              </div>
             <section>
                <CardCollaborator collaborator={collaborator} />  
              </section>

              {collaboratorQuery.length === 0 && (
                  <p className="text-gray-400 mt-4">Nenhum Colaborador cadastrado</p>
              )}
              
           </main>
        </Container>
    );
}   