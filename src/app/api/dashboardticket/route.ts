import {NextResponse} from  'next/server';
import {getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth'; 
import prisma  from '@/lib/prisma';
export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if(!session || !session.user) { 
        return NextResponse.json({error: "Ticket não autenticado"}, {status: 401});
    }

    const {name,description,collaboratorId} = await request.json();
    console.log(collaboratorId);
    if (!name || !description || !collaboratorId) {
        return;
      }
    try {
        await prisma.ticket.create({
            data: {
              name: name as string,
              description: description as string,
              CollaboratorId: collaboratorId as string,
              status: "Em andamento",
              UserId: session?.user.id
            }
          })
        return NextResponse.json({message: "Chamado cadastrado com sucesso"});
    } catch (error) {
        return NextResponse.json({error: "Falha ao cadastrar chamado"}, {status: 400});
    }
}   