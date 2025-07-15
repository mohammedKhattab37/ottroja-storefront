import { z } from 'zod'

export const SignInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(255, { message: 'Password is too long' }),
})

export const SignUpSchema = z
  .object({
    first_name: z.string().min(1, 'Please enter your first name'),
    last_name: z.string().min(1, 'Please enter your last name'),
    email: z.string().email('Please enter a valid email address'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(255, { message: 'Password is too long' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

// Customer registration schema - simplified with only required fields
export const CustomerRegisterSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name cannot exceed 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

// Customer login schema
export const CustomerLoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

export type CustomerRegisterInput = z.infer<typeof CustomerRegisterSchema>
export type CustomerLoginInput = z.infer<typeof CustomerLoginSchema>
