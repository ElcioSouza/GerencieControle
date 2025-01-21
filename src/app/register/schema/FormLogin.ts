import { z } from "zod"

export const FormLoginSchema = z.object({
    name: z.string().min(1, "O campo nome é obrigatorio"),
    email: z.string().email("Digite um e-mail valido").min(1, "O campo email é obrigatorio"),
 /*    phone: z.string().refine((value) => {
        return /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) || /^\d{2}\s\d{9}$/.test(value) || /^\d{11}$/.test(value)
    },
    {
        message: "O número de telefone deve estar (DD) 999999999"
    }), */
    phone: z.string().min(14, "O campo telefone é obrigatorio"),
    address: z.string(),
    password: z.string().min(1, "O campo senha é obrigatorio"),
})

export type FormLoginSchemaData = z.infer<typeof FormLoginSchema>