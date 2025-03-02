import { z } from "zod"
export const FormEditSchemaTicket = z.object({
    name: z.string().min(1, "Campo nome obrigatorio"),
    description: z.string().min(1, "Campo descrição obrigatorio"),
    status: z.string().min(1, "Selecione um status obrigatorio"),
})

export type FormEditSchemaTicketData = z.infer<typeof FormEditSchemaTicket>