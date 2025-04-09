import { Resend } from "resend";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log(process.env.RESEND_API_KEY);
const SECRET = process.env.NEXTAUTH_SECRET; 
const resend = new Resend(process.env.RESEND_API_KEY);
const APP_URL = process.env.HOST_URL;
const { email, tempPassword } = await req.json();
const datareq = {
  email: email,
  tempPassword: tempPassword,
};

if (!email || !tempPassword) {
    return NextResponse.json({ error: "Email e senha provisória são obrigatórios!" }, { status: 400 });
  }


  try {
    // Criar um token JWT válido por 1 hora
    const token = jwt.sign({ email }, SECRET as string, { expiresIn: "1h" });

    // Criar o link para redefinir senha
    const resetLink = `${APP_URL}/definir-senha?token=${token}`;


    // Enviar e-mail com Resend
    const {data, error} = await resend.emails.send({
      from: "Gerencie Controle <elcio.monico@gmail.com>", // email do sistema
      to: email,
      subject: "Acesse sua conta e redefina sua senha",
      html: `
        <h2>Bem-vindo!</h2>
        <p>Sua conta foi criada com sucesso.</p>
        <p><strong>Sua senha provisória:</strong> <code>${tempPassword}</code></p>
        <p>Para redefinir sua senha, clique no link abaixo:</p>
        <a href="${resetLink}" style="background:#007bff;color:#fff;padding:10px 20px;text-decoration:none;border-radius:5px;">Alterar Senha</a>
        <p>O link expira em 1 hora.</p>
      `,
    });
    if (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
    return NextResponse.json({ message: {...datareq,token,resetLink,data} }, { status: 200 });

    return NextResponse.json({ message: "E-mail enviado com sucesso!", data }, { status: 200 });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return NextResponse.json({ error: "Erro ao enviar e-mail" }, { status: 500 });
  }
}
