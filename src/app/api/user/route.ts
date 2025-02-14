import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bscript from "bcrypt";

export async function POST(request: Request) {
    const {email,name, password, passwordconfirm} = await request.json();
    //const bscript = bscript.hashSync(password, 10);
    if(password !== passwordconfirm) {
        return NextResponse.json({error: "As senhas não conferem"}, {status: 400});
    }
    if(!email || !password || !name) {
        return NextResponse.json({error: "Email ou senha inválido"}, {status: 400});
    }
    const resultEmail = await prisma.user.findFirst({
            where: {
                email
            }
        })
    if(resultEmail) {
        return NextResponse.json({error: "Email ja cadastrado"}, {status: 200});
    }
    const passwordHash = await bscript.hash(password, 10);
    await prisma.user.create({
            data: {
                name,
                email,
                password: passwordHash
            }
         
        });
    return NextResponse.json({message: "Usuário criado com sucesso"}, {status: 201});

}