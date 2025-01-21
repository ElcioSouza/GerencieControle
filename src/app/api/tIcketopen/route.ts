import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: "Ticket não autenticado" }, { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const {name,description,status,collaboratorId} = await request.json();
    const ticketId = searchParams.get("id");
    if (!ticketId) {
        return NextResponse.json({ error: "Ticket não encontrado" }, { status: 400 });
    }
    try {
       await prisma.ticket.update({
            where: {
                id: ticketId as string,
            },
            data: {
                name,
                description,
                CollaboratorId: collaboratorId,
                status,
            }
        }) 
        return NextResponse.json({ pack: {
            message: "Ticket atualizado com sucesso",
        } });
} catch (error) {
    return NextResponse.json('error ao atualizar: '+ error, { status: 400 });
}
}