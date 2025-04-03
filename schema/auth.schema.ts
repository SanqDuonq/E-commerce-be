import { z } from "zod";

export const signUpSchema = z.object({
    email: z.string().min(1, 'Email is required').endsWith('@gmail.com', 'Email must be @gmail.com'),
    fullName: z.string().min(1, 'Full name is required'),
    password: z.string().min(1, 'Password is required').regex(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#+^])[A-Za-z\\d@$!%*?&#+^]{8,32}$'),
    'Password must be 8-32 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.')
})

