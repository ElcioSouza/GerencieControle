import { Container } from '@/components/Container';
import {getServerSession} from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { TableTicketDashboard } from './components/dashboard/TableTicketDashboard';
import { ticketsFactory } from '../factories/TicketsFactory';
export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    if(!session || !session.user) {
        redirect('/');
    }
    const [ticketQuery, total] = await Promise.all([
        prisma.ticket.findMany({
          where: {
            Collaborator: {
              UserId: session.user.id
            }
          },
          include: {
            Collaborator: true
          },
          skip: 0, // offset
          take: 5, // limit
          orderBy: {
            created_at: "desc"
          }
        }),
        prisma.ticket.count({
          where: {
            Collaborator: {
              UserId: session.user.id
            }
          }
        })
      ]);
      
      const result = {
        data: ticketQuery,
        total: total
      };
    const tickets = ticketsFactory(result.data);
    return (
       <Container>
        <main className="mt-9 mb-2">
            <TableTicketDashboard tickets={tickets} total={result.total} />
        </main>
       </Container>
    );
}
