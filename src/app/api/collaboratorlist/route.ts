import {NextResponse} from  'next/server';
import {getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth'; 
import prisma  from '@/lib/prisma';
export async function GET(request: Request) {
   const session = await getServerSession(authOptions);
   if(!session || !session.user) { 
       return NextResponse.json({error: "Colaborador não autenticado"}, {status: 401});
   }
     const {searchParams} = new URL(request.url);
     const collaboratorId = searchParams.get("id"); 
     const collaborator = await prisma.collaborator.findFirst({where: {id: collaboratorId as string}});

     if(!collaborator) {
        return NextResponse.json({message: "Colaborador id nao encontrado"}, {status: 400});
     }

    return NextResponse.json({"pack": {data: {collaborator, userId:session.user.id}, message: "Colaborador encontrado com sucesso"}},{status: 200});
}
