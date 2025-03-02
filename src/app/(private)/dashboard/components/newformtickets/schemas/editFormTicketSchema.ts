import { z } from "zod"
export const FormSchemaTicket = z.object({
    name: z.string().min(1, "Campo nome obrigatorio"),
    description: z.string().min(1, "Campo descrição obrigatorio"),
    collaboratorId: z.string().min(1, "Selecione um colaborador obrigatorio"),
})

export type FormSchemaTicketData = z.infer<typeof FormSchemaTicket>