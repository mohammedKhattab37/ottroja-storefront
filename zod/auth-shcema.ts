import { z } from 'zod'

export const SignInSchema = z.object({
  email: z.string().min(1, 'Please enter your country'),
  password: z
    .string()
    .min(4, 'Cannot be less than 4 characters')
    .max(255, { message: 'Password is too long' }),
})

export const SignUpSchema = z
  .object({
    first_name: z.string().min(1, 'Please enter your first name'),
    last_name: z.string().min(1, 'Please enter your last name'),
    email: z.string().min(1, 'Please enter your country'),
    password: z
      .string()
      .min(4, 'Cannot be less than 4 characters')
      .max(255, { message: 'Password is too long' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
