import { Container } from "@/components/Container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CardCliente } from "./components/cardCliente";
import prisma from "@/lib/prisma";

export default async function Cliente() {
        const session = await getServerSession(authOptions);
        if(!session || !session.user) {
            redirect('/');
        }

        const clientes = await prisma.cliente.findMany({
            where: {
                UserId: session.user.id
            }
        })
       
    return (
        <Container>
           <main className="mt-9 mb-2">
              <div className="flex items-center justify-between">
                 <h1 className="text-3xl font-bold">Meus Clientes</h1>
                 <Link href="/dashboard/cliente/new" className="bg-blue-500 px-4 py-1 rounded text-white">
                    Novo cliente
                 </Link>
              </div>

              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {clientes.map(cliente => (
                  <CardCliente key={cliente.id} cliente={cliente} />    
              ))}
              </section>

              {clientes.length === 0 && (
                  <p className="text-gray-400 mt-4">Nenhum cliente cadastrado</p>
              )}
              
           </main>
        </Container>
    );
}   