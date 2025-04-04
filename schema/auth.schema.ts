import { z } from "zod";

export const signUpSchema = z.object({
    email: z.string().min(1, 'Email is required').endsWith('@gmail.com', 'Email must be @gmail.com'),
    fullName: z.string().min(1, 'Full name is required'),
    password: z.string().min(1, 'Password is required').regex(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#+^])[A-Za-z\\d@$!%*?&#+^]{8,32}$'),
    'Password must be 8-32 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.')
})

export const SignInSchema = z.object({
    email: z.string().min(1, 'Email is required').endsWith('@gmail.com', 'Email must be @gmail.com'),
    password: z.string().min(1, 'Password is required')
})

export const verifyEmailSchema = z.object({
    email: z.string().min(1, 'Email is required').endsWith('@gmail.com', 'Email must be @gmail.com'),
    otp: z.string().min(1, 'OTP is required').max(6, 'OTP not exceed 6 digits')
})

export const resendOTPSchema = z.object({
    email: z.string().min(1, 'Email is required').endsWith('@gmail.com', 'Email must be @gmail.com'),
})

export const forgotPasswordSchema = z.object({
    email: z.string().min(1, 'Email is required').endsWith('@gmail.com', 'Email must be @gmail.com'),
})

export const resetPasswordSchema = z.object({
    email: z.string().min(1, 'Email is required').endsWith('@gmail.com', 'Email must be @gmail.com'), 
    otp: z.string().min(1, 'OTP is required').max(6, 'OTP not exceed 6 digits'),
    newPassword: z.string().min(1, 'Password is required').regex(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#+^])[A-Za-z\\d@$!%*?&#+^]{8,32}$'),
    'Password must be 8-32 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.')
})
