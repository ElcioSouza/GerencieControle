import {NextResponse} from  'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma  from '@/lib/prisma';

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    const clienteEmail = searchParams.get("email");
    try {
        if(!clienteEmail || clienteEmail === "") {
            return  NextResponse.json({error: "Cliente não encontrado"}, {status: 400});   
        }
        const cliente = await prisma.cliente.findFirst({
            where: {
                email: clienteEmail
            }
        })
        if(!cliente) {
            return  NextResponse.json(cliente);   
        } else {
            return NextResponse.json({"pack": {
                data: cliente,
                message: "Cliente encontrado com sucesso",
            }})
        }
    } catch (error) {
        return  NextResponse.json({error: "Cliente não encontrado"}, {status: 400});   
    }
}


export async function POST(request: Request) {
    const {clienteId, name, description} = await request.json();
    if(!clienteId || !name || !description) {
        return  NextResponse.json({error: "Cliente não encontrado"}, {status: 400});
    }
    try {
        await prisma.ticket.create({
            data: {
                name,
                description,
                ClienteId: clienteId,
                status: "Aberto",
            }
        })
        return  NextResponse.json({message: "Chamado registrado com sucesso"});
    } catch (error) {
        return  NextResponse.json({error: "Cliente não encontrado"}, {status: 400});   
    }
}

