import {NextResponse} from  'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma  from '@/lib/prisma';
export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if(!session || !session.user) { 
        return NextResponse.json({error: "Cliente não autenticado"}, {status: 401});
    }
    const {name,email,phone,address,UserId} = await request.json();
    try {
        const response = await prisma.cliente.findFirst({
            where: {
                email
            }
        })
        if(response) {
            return NextResponse.json({error: "Email já cadastrado"}, {status: 400});
            return;
        }
        await prisma.cliente.create({
            data: {
                name,
                email,
                phone,
                address: address ? address : "",
                UserId
            }
        })
        return NextResponse.json({message: "Cliente cadastrado com sucesso"});
    } catch (error) {
        return NextResponse.json({error: "Falha ao cadastrar Cliente"}, {status: 400});
    }
}   

export async function GET(request: Request) {
    const requestAutorition = request.headers.get("authorization")
    const token = requestAutorition?.split(" ")[1];
    //console.log(token);
    return NextResponse.json({message: "Cliente cadastrado com sucesso"});
}   

export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions);
    console.log(session);
    console.log(session!.user!);
    if(!session || !session.user) { 
        return NextResponse.json({error: "Cliente não autenticado"}, {status: 401});
    }
    try {
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("id"); 
        if(!userId) {
            return NextResponse.json({error: "Id não encontrado no cliente"}, {status: 400});
        }

        const findTicket =await prisma.ticket.findFirst({
            where: {
                ClienteId: userId as string
            }
        })

        if(findTicket?.status === "Aberto") {
            return NextResponse.json({pack: {
                error: "Não é possível deletar o cliente pois ele possui um chamado aberto",
                status: findTicket.status
            }}, {status: 400});
        } else {
            await prisma.cliente.delete({
                where: {
                    id: userId as string
                }   
            })
            return NextResponse.json({message: "Cliente deletado com sucesso"});
        }
    } catch (error) {
        return NextResponse.json({error: "Falha ao deletar Cliente"}, {status: 400});
    }
}   