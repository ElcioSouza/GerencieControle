import {NextResponse} from  'next/server';
import nodemailer from 'nodemailer';
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
    const {email,tempPassword } = await request.json();
    
    const SECRET = process.env.NEXTAUTH_SECRET; 
    const APP_URL = process.env.HOST_URL;

    if (!email || !tempPassword) {
        return NextResponse.json({ error: "Email e senha provisória são obrigatórios!" }, { status: 400 });
    }
    try {
    
    const transporter = await nodemailer.createTransport({
      host: process.env.EMAIL_HOST,  //  smtp.gmail.com
      port: process.env.EMAIL_PORT,  // 465          
      secure: true,  
      
      auth: {
        user: process.env.EMAIL_USER, //  your email address
        pass: process.env.EMAIL_PASSWORD, // senha do app do google
      },
      debug: true, // <-- Ativar logs detalhados
      logger: true, // <-- Exibir logs no console
    });
    // Criar um token JWT válido por 1 hora
    const token = jwt.sign({ email }, SECRET as string, { expiresIn: "1h" });

    // Criar o link para redefinir senha
    const resetLink = `${APP_URL}/definir-senha?token=${token}`;

    const mailOptions = {
      from: `gerencie controle <${process.env.EMAIL_USER}>`, 
      to: "elcio.monico@gmail.com",
      cc: 'elcio.monico@gmail.com',
      subject: `Novo contato pelo formulário – Gerencie Controle`,
      html: `
        <h2>Bem-vindo!</h2>
        <p>Sua conta foi criada com sucesso.</p>
        <p><strong>Detalhes de acesso provisório:</strong> <code>${tempPassword}</code></p>
        <p>Para redefinir sua senha:</p>
        <a href="${resetLink}" style="background:#007bff;color:#fff;padding:5px; text-decoration:none;border-radius:5px;">Alterar Senha</a>
        <p>O link expira em 1 hora.</p>

      `,
    };

   const result = await transporter.sendMail(mailOptions);

   if (!result) {
    return NextResponse.json(
      { message: 'Erro ao enviar o e-mail'},
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: 'Email enviado com sucesso!' },
    { status: 200 }
  );
    
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
    return NextResponse.json(
      { message: 'Error ao enviar email', error: error },
      { status: 500 }
    );
  }
}
