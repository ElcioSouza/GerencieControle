import { z } from "zod"

export const formCreateCollaboratorSchema = z.object({
    name: z.string().min(1, "O campo nome é obrigatorio"),
    email: z.string().email("Digite um e-mail valido").min(1, "O campo email é obrigatorio"),
    phone: z.string().min(14, "O campo telefone é obrigatorio"),
    address: z.string()
})

export type formCreateCollaboratorSchemaData = z.infer<typeof formCreateCollaboratorSchema>