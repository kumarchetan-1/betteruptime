
import { z } from 'zod'

export const AuthInput = z.object({
    name: z.string().optional(),
    username: z.string(),
    password: z.string()
})

