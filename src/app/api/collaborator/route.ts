import {NextResponse} from  'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma  from '@/lib/prisma';
export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if(!session || !session.user) { 
        return NextResponse.json({error: "Colaborador não autenticado"}, {status: 401});
    }
    const {name,email,phone,address,status,UserId} = await request.json();
    try {
        const response = await prisma.collaborator.findFirst({
            where: {
                email
            }
        })
        if(response) {
            return NextResponse.json({error: "Email já cadastrado"}, {status: 400});
        }
        await prisma.collaborator.create({
            data: {
                name,
                email,
                phone,
                address: address ? address : "",
                status,
                UserId
            }
        })
        return NextResponse.json({message: "Colaborador cadastrado com sucesso"});
    } catch (error) {
        return NextResponse.json({error: "Falha ao cadastrar colaborador"}, {status: 400});
    }
}   

export async function GET(request: Request) {
    const requestAutorition = request.headers.get("authorization")
    const token = requestAutorition?.split(" ")[1];
    //console.log(token);
    return NextResponse.json({message: "Colaborador cadastrado com sucesso"});
}   

export async function PATCH(request: Request) {
    const session = await getServerSession(authOptions);
    if(!session || !session.user) { 
        return NextResponse.json({error: "Colaborador não autenticado"}, {status: 401});
    }
    try {
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("id");
        if(!userId) {
            return NextResponse.json({error: "Id não encontrado no colaborador"}, {status: 400});
        }

        const findTicket = await prisma.ticket.findFirst({
            where: {
                CollaboratorId: userId as string
            }
        })
        console.log(findTicket?.status)
        if(findTicket?.status === "Em andamento" || findTicket?.status === "Urgente" || findTicket?.status === "Baixo" || findTicket?.status === "Pendente") {
            return NextResponse.json({pack: {
                error: `Não é possível deletar o colaborador pois ele possui um chamado ${findTicket?.status}`,
                status: findTicket.status
            }}, {status: 400});
        } else {
             await prisma.collaborator.update({
                where: {
                    id: userId as string
                },
                data: {
                    status: "Inativo"
                }   
            }) 
            return NextResponse.json({message: "Colaborador deletado com sucesso"});
        }
    } catch (error) {
        return NextResponse.json({error: "Falha ao alterar status do colaborador"}, {status: 400});
    }
}   


export async function PUT(request: Request) {
    const session = await getServerSession(authOptions);
    if(!session || !session.user) { 
        return NextResponse.json({error: "Colaborador não autenticado"}, {status: 401});
    }
    try {
        const {name,email,phone,address,status,UserId} = await request.json();
        const {searchParams} = new URL(request.url);
        const collaboratorId = searchParams.get("id");
        const collaborator = await prisma.collaborator.findMany({
            where: {
                id: collaboratorId as string
            }
        })
        if(!collaborator) {
            return NextResponse.json({message: "Colaborador id não encontrado"}, {status:400});
        }
        await prisma.collaborator.update({
            where: {
                id: collaboratorId as string
            },
            data: {
                name,
                email,
                phone,
                address: address ? address : "",
                status,
                UserId
            }
        }) 
            return NextResponse.json({message: "Colaborador alterado com sucesso"});
    } catch (error) {
        return NextResponse.json({error: "Falha ao alterar o colaborador"}, {status: 400});
    }
}   