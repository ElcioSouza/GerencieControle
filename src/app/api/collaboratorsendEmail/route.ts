import {NextResponse} from  'next/server';
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { to, subject, text, email } = await req.json();

    if (!to || !subject || !text) {
      return NextResponse.json(
        { error: "Campos obrigatórios ausentes" },
        { status: 400 }
      );
    }

    const msg = {
      to: to,
      from: email || "",
      subject,
      text,
    };

    await sgMail.send(msg);

    return NextResponse.json({ message: "E-mail enviado com sucesso!" }, { status: 200 });
  } catch (error: any) {
    console.error("Erro ao enviar e-mail:", error.response?.body || error);
    return NextResponse.json({ error: "Erro ao enviar e-mail" }, { status: 500 });
  }
}
