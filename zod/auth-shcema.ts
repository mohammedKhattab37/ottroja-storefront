import { z } from 'zod'

// Error message keys for translation
export const AUTH_ERROR_KEYS = {
  EMAIL_REQUIRED: 'auth.errors.email.required',
  EMAIL_INVALID: 'auth.errors.email.invalid',
  PASSWORD_REQUIRED: 'auth.errors.password.required',
  PASSWORD_MIN_LENGTH: 'auth.errors.password.min_length',
  PASSWORD_MAX_LENGTH: 'auth.errors.password.max_length',
  NAME_REQUIRED: 'auth.errors.name.required',
  NAME_MAX_LENGTH: 'auth.errors.name.max_length',
  PASSWORDS_NO_MATCH: 'auth.errors.password.no_match',
  FIRST_NAME_REQUIRED: 'auth.errors.first_name.required',
  LAST_NAME_REQUIRED: 'auth.errors.last_name.required',
} as const

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: AUTH_ERROR_KEYS.EMAIL_REQUIRED })
    .email(AUTH_ERROR_KEYS.EMAIL_INVALID),
  password: z
    .string()
    .min(1, { message: AUTH_ERROR_KEYS.PASSWORD_REQUIRED })
    .min(6, AUTH_ERROR_KEYS.PASSWORD_MIN_LENGTH)
    .max(255, { message: AUTH_ERROR_KEYS.PASSWORD_MAX_LENGTH }),
})

export const SignUpSchema = z
  .object({
    first_name: z.string().min(1, AUTH_ERROR_KEYS.FIRST_NAME_REQUIRED),
    last_name: z.string().min(1, AUTH_ERROR_KEYS.LAST_NAME_REQUIRED),
    email: z
      .string()
      .min(1, { message: AUTH_ERROR_KEYS.EMAIL_REQUIRED })
      .email(AUTH_ERROR_KEYS.EMAIL_INVALID),
    password: z
      .string()
      .min(1, { message: AUTH_ERROR_KEYS.PASSWORD_REQUIRED })
      .min(6, AUTH_ERROR_KEYS.PASSWORD_MIN_LENGTH)
      .max(255, { message: AUTH_ERROR_KEYS.PASSWORD_MAX_LENGTH }),
    confirmPassword: z.string().min(1, { message: AUTH_ERROR_KEYS.PASSWORD_REQUIRED }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: AUTH_ERROR_KEYS.PASSWORDS_NO_MATCH,
    path: ['confirmPassword'],
  })

// Customer registration schema - simplified with only required fields
export const CustomerRegisterSchema = z.object({
  name: z.string().min(1, AUTH_ERROR_KEYS.NAME_REQUIRED).max(100, AUTH_ERROR_KEYS.NAME_MAX_LENGTH),
  email: z
    .string()
    .min(1, { message: AUTH_ERROR_KEYS.EMAIL_REQUIRED })
    .email(AUTH_ERROR_KEYS.EMAIL_INVALID),
  password: z
    .string()
    .min(1, { message: AUTH_ERROR_KEYS.PASSWORD_REQUIRED })
    .min(6, AUTH_ERROR_KEYS.PASSWORD_MIN_LENGTH),
})

// Customer login schema
export const CustomerLoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: AUTH_ERROR_KEYS.EMAIL_REQUIRED })
    .email(AUTH_ERROR_KEYS.EMAIL_INVALID),
  password: z.string().min(1, AUTH_ERROR_KEYS.PASSWORD_REQUIRED),
})

export type CustomerRegisterInput = z.infer<typeof CustomerRegisterSchema>
export type CustomerLoginInput = z.infer<typeof CustomerLoginSchema>
