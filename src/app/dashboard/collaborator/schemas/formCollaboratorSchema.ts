import { z } from "zod"

export const FormCollaboratorSchema = z.object({
    name: z.string().min(1, "O campo nome é obrigatorio"),
    email: z.string().email("Digite um e-mail valido").min(1, "O campo email é obrigatorio"),
    phone: z.string().min(14, "O campo telefone é obrigatorio"),
    address: z.string(),
    status: z.string()
})

export type FormCollaboratorSchemaData = z.infer<typeof FormCollaboratorSchema>