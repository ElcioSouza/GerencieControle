import {NextResponse} from  'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma  from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { colllaboratorFactory } from '@/app/factories/ColllaboratorFactory';
import { create } from 'domain';
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
                status:"Ativo",
                UserId
            }
        })
        return NextResponse.json({message: "Colaborador cadastrado com sucesso"});
    } catch (error) {
        return NextResponse.json({error: "Falha ao cadastrar colaborador"}, {status: 400});
    }
}   

/* export async function GET(request: Request) {
    const requestAutorition = request.headers.get("authorization")
    const token = requestAutorition?.split(" ")[1];
    return NextResponse.json({message: "Colaborador cadastrado com sucesso"});
}    */

    export async function GET(request: Request) {
        const session = await getServerSession(authOptions);
        if(!session || !session.user) {
            return NextResponse.json({error: "Colaborador não autenticado"}, {status: 401});
        }
        const {searchParams} = new URL(request.url);
        const offset = Number(searchParams.get("offset"));
        const limit = Number(searchParams.get("limit"));
        const search = String(searchParams.get("search"));
        const status = String(searchParams.get("status"));
        const filter = {
            status: status
        }    
        interface queryPrismaTypes {
            [key: string]: {
                contains: string;
                mode?: "insensitive";
            }
        }
        const querySearchReturn = (search: string) => {
            if(!search) return undefined
            const query:queryPrismaTypes[] = [
                {
                  name: {
                    contains: search,
                    mode: Prisma.QueryMode.insensitive,
                  }
                },
                {
                    email: {
                      contains: search,
                      mode: Prisma.QueryMode.insensitive,
                    }
                  },
                  {
                    phone: {
                      contains: search,
                      mode: Prisma.QueryMode.insensitive,
                    }
                  }
            ]
            return query.length ? query : undefined
        }

        interface FilterType {
            status: string
        }
        const queryFilterReturn = (filter: FilterType) => {
            const query:queryPrismaTypes[] = []
            if(filter.status) {
                query.push({
                    status: {
                        contains: filter.status
                    }
                })
            }   
            return query.length ? query : undefined
        }

        try {    
            const queryFetchDefault = {
                where: {
                  UserId: session.user.id,
                  OR: querySearchReturn(search),
                  AND: queryFilterReturn(filter)
                },
              };
              
            const [collaboratorQuery, total_fetch, total] = await Promise.all([
                prisma.collaborator.findMany({
                  ...queryFetchDefault,
                  skip: offset,
                  take: limit,
                  orderBy: {
                    created_at: "desc"
                  }
                }),
                prisma.collaborator.count(queryFetchDefault),
                prisma.collaborator.count({
                  where: {
                      UserId: session.user.id
                  }
                })
            ]);
            const collaborator = colllaboratorFactory(collaboratorQuery);
            return NextResponse.json({pack: {data:{collaborator, total_fetch, total}, message: "Chamados encontrados com sucesso"}}, {status: 200}); 
        } catch (error) {
            return NextResponse.json({error: "Falha ao buscar colaboradores"}, {status: 400});
        }
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