import { z } from "zod"

export const FormSchemaTicket = z.object({
    name: z.string().min(1, "O nome do chamado é obrigatorio"),
    description: z.string().min(1, "Descreve um pouco sobre seu problema..."),
})

export type FormSchemaTicketData = z.infer<typeof FormSchemaTicket>