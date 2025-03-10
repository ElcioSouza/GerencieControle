import {NextResponse} from  'next/server';
import prisma  from '@/lib/prisma';
import bscript from "bcrypt";
export async function POST(request: Request) {
     const {name,email,password,passwordconfirm} = await request.json();
     if(!name || !email || !password || !passwordconfirm) {
         return NextResponse.json({error: "Campos obrigatórios não preenchidos"}, {status: 400});
     }
     if(password !== passwordconfirm) {
        return NextResponse.json({error: "As senhas não conferem"}, {status: 400});
    }

    const passwordHash = await bscript.hash(password, 10);
     const collaborator = await prisma.collaborator.findFirst({
        where: {
            User: {
                email: email
            },
        },
        include: {
            User: true, // Incluindo o relacionamento User
          }
     });

     
     
     // se colaborador nao tem relação com seu usuario ele faz o cadastro do usuario e colaborador com permissão de colaborador
     if(!collaborator) {
         const user =await prisma.user.create({
             data: {
                 name,
                 email,
                 password: passwordHash,
                 origin: "COLLABORATOR"
             }
         });
         return NextResponse.json({"pack": {data: {user}, message: "Colaborador cadastrado com sucesso"}},{status: 201});
     }

  // Verificando se o colaborador já está cadastrado
  if (collaborator.User && collaborator.User.email === email) {
    return NextResponse.json({ error: "Colaborador já cadastrado" }, { status: 400 });
  }
}
