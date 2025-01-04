import { SendEmailDTO } from "@/dto/SendEmailDTO";
import emailjs from "@emailjs/browser";
export default class SendEmailService {
  public static async execute(data: SendEmailDTO) {
    if (
      !process.env.NEXT_PUBLIC_SERVICE_ID ||
      !process.env.NEXT_PUBLIC_TEMPLATE_ID ||
      !process.env.NEXT_PUBLIC_PUBLIC_KEY
    ) {
      return null;
    }
    const templeteParams = {
      from_name: data.name,
      to_name: process.env.NEXT_PUBLIC_TO_NAME,
      message: data.msg,
      email: data.email,
      phone: data.phone,
    };
    const res = await emailjs.send(
      process.env.NEXT_PUBLIC_SERVICE_ID,
      process.env.NEXT_PUBLIC_TEMPLATE_ID,
      templeteParams,
      process.env.NEXT_PUBLIC_PUBLIC_KEY
    );
    return res.status;
  }
}
