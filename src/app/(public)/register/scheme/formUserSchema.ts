import { z } from "zod"

export const FormUserSchema = z.object({
    name: z.string().min(1, "Campo nome obrigatorio"),
    email: z.string().email("Digite um e-mail valido").min(1, "O campo email é obrigatorio"),
    password: z.string().min(1, "Campo senha obrigatorio"),
    passwordconfirm: z.string().min(1, "Campo senha obrigatorio"),
})

export type FormSchemaUserData = z.infer<typeof FormUserSchema>