import {NextResponse} from  'next/server';
import prisma  from '@/lib/prisma';

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    const collaboratorEmail = searchParams.get("email");
    try {
        if(!collaboratorEmail || collaboratorEmail === "") {
            return  NextResponse.json({error: "Colaborador não encontrado"}, {status: 400});   
        }
        const collaborator = await prisma.collaborator.findFirst({
            where: {
                email: collaboratorEmail
            }
        })
        if(!collaborator) {
            return  NextResponse.json(collaborator);   
        } else {
            return NextResponse.json({"pack": {
                data: collaborator,
                message: "Colaborador encontrado com sucesso",
            }})
        }
    } catch (error) {
        return  NextResponse.json({error: "Colaborador não encontrado"}, {status: 400});   
    }
}


export async function POST(request: Request) {
    const {collaboratorId, name, description} = await request.json();
    if(!collaboratorId || !name || !description) {
        return  NextResponse.json({error: "Colaborador não encontrado"}, {status: 400});
    }
    try {
        await prisma.ticket.create({
            data: {
                name,
                description,
                CollaboratorId: collaboratorId,
                status: "",
            }
        })
        return  NextResponse.json({message: "Chamado registrado com sucesso"});
    } catch (error) {
        return  NextResponse.json({error: "Colaborador não encontrado"}, {status: 400});   
    }
}

