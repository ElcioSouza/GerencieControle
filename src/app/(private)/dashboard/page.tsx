import { Container } from '@/components/Container';
import {getServerSession} from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { TableTicketDashboard } from '@/app/(private)/dashboard/components/dashboard/TableTicketDashboard';
import { ticketsFactory } from '@/app/factories/TicketsFactory';
export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    const [ticketQuery, total] = await Promise.all([
        prisma.ticket.findMany({
          where: {
            Collaborator: session?.user.origin === "USER" 
            ? { UserId: session?.user.id } 
            :  { email: session?.user.email}
          },
          include: {
            Collaborator: true
          },
          skip: 0, // offset
          take: 6, // limit
          orderBy: {
            created_at: "desc"
          }
        }),
        prisma.ticket.count({
          where: {
            Collaborator: session?.user.origin === "USER" 
            ? { UserId: session?.user.id } 
            :  { email: session?.user.email}
          }
        })
      ]);
      
      const result = {
        data: ticketQuery,
        total: total
      };
    const tickets = ticketsFactory(result.data);
   // console.log(tickets);
    return (
       <Container>
        <main className="mt-9 mb-2">
            <TableTicketDashboard tickets={tickets} total={result.total} />
        </main>
       </Container>
    );
}
