import { z } from "zod"

export const FormSchema = z.object({
    email: z.string().email("Digite um e-mail valido").min(1, "O campo email é obrigatorio"),
})

export type FormSchemaData = z.infer<typeof FormSchema>