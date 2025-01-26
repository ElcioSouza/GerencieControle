import { NextResponse } from "next/server";
import {getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth'; 
import prisma from "@/lib/prisma";
import { ticketsFactory } from "@/app/factories/TicketsFactory";
import { Prisma } from "@prisma/client";


export async function PATCH(request: Request) {
    const session = await getServerSession(authOptions);
    if(!session || !session.user) {
        return NextResponse.json({error: "Ticket não autenticado"}, {status: 401});
    }
    const {id} = await request.json();
    
    const findTicket = await prisma.ticket.findFirst({
        where: {
            id: id as string
        }
    });
    if(!findTicket) {
        return NextResponse.json({error: "Falha ao alterar ticket"}, {status: 400});
    }
    try { 
        await prisma.ticket.update({
            where: {
              id: id as string
            },
            data: {
              status:"Fechado"
            }          
        })
        return NextResponse.json({message: "Chamado alterado com sucesso"}, {status: 200}); 
    } catch (error) {
        return NextResponse.json({error: "Falha ao alterar ticket"}, {status: 400});
    }
}
export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    if(!session || !session.user) {
        return NextResponse.json({error: "Ticket não autenticado"}, {status: 401});
    }
    const {searchParams} = new URL(request.url);
    const offset = Number(searchParams.get("offset"));
    const limit = Number(searchParams.get("limit"));
    const search = String(searchParams.get("search"))
 
    try {
        const queryFetchDefault = {
          where: {
            Collaborator: {
              UserId: session.user.id,
              AND: [
                {
                  name: {
                    contains: search,
                    mode: Prisma.QueryMode.insensitive,
                  }
                },
              ]
            }
          }
        } 
        const [ticketQuery, total_fetch, total] = await Promise.all([
            prisma.ticket.findMany({
              ...queryFetchDefault,
              skip: offset,
              take: limit,
              include: {
                Collaborator: true
              },
              orderBy: {
                created_at: "desc"
              }
            }),
            prisma.ticket.count(queryFetchDefault),
            prisma.ticket.count({
              where: {
                Collaborator: {
                  UserId: session.user.id
                }
              }
            })
        ]);
        const tickets = ticketsFactory(ticketQuery);
        return NextResponse.json({pack: {data:{tickets, total_fetch, total}, message: "Chamados encontrados com sucesso"}}, {status: 200}); 
    } catch (error) {
        return NextResponse.json({error: "Falha ao buscar chamados"}, {status: 400});
    }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if(!session || !session.user) {
      return NextResponse.json({error: "Ticket não autenticado"}, {status: 401});
  }
  const {name,description,status} = await request.json();
  try { 
    const tickets = await prisma.ticket.findMany({
          where: {
              OR: [
                {
                  name: {
                    contains: name
                  }
                },
                {
                  status: {
                    contains: status
                  }
                },
                {
                  description: {
                    contains: description
                  }
                },
              ]
          } 
      })
      return NextResponse.json({"pack": {
        data: tickets,
        message: "Colaborador encontrado com sucesso",
        status:200
    }})
  } catch (error) {
      return NextResponse.json({error: "Falha ao encontrar ticket"}, {status: 400});
  }
}