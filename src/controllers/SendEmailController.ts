import { SendEmailDTO } from "@/dto/SendEmailDTO";
import SendEmailService from "@/services/SendEmailService";

interface Hooks {
  setSendFormEmail: (value: boolean) => void;
}
export default class SendEmailController {
  public static async execute(data: SendEmailDTO, { setSendFormEmail }: Hooks) {
    const response = await SendEmailService.execute(data);
    if (!response) console.log("Parametros invalidos");
    if (response === 200) {
      setSendFormEmail(false);
    }
  }
}
