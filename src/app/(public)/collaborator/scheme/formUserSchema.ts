import { z } from "zod"

export const FormSchemaUser = z.object({
    email: z.string().email("Digite um e-mail valido").min(1, "O campo email é obrigatorio"),
    password: z.string().min(1, "Campo senha obrigatorio"),
})

export type FormSchemaUserData = z.infer<typeof FormSchemaUser>