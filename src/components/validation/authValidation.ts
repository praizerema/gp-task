import * as z from 'zod';


const passwordVal = z
.string()
.min(8, 'Password must be at least 8 characters')
.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
.regex(/[a-z]/, 'Password must contain at least one lowercase letter')
.regex(/[0-9]/, 'Password must contain at least one number')
.regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')

export const logInSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: passwordVal
})


export const registerSchema = z.object({
    email: z.string().email('Invalid email address'),
    username: z.string().min(3, 'Enter at least 3 characters'),
    password: passwordVal,
    confirm_password: z.string(),
}).refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ['confirm_password']

})