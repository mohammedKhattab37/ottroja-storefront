import { z } from 'zod'

export const addressSchema = z.object({
  country: z.string().min(1, 'Please choose a country'),
  state: z.string().min(1, 'Please choose a state'),
  city: z.string().min(1, 'Please choose a city'),
  district: z.string().min(1, 'Please enter a district'),
  building: z.string().min(1, 'Please enter the building No.'),
  apartment: z.string().min(1, 'Please enter the apartment No.'),
  postal_code: z.string().optional(),
  extra_address: z.string().optional(),
  zone: z.string(),
})

const cashPaymentSchema = z.object({
  method: z.literal('CASH_ON_DELIVERY'),
})

const instapayPaymentSchema = z.object({
  method: z.literal('INSTAPAY'),
})

const cardPaymentSchema = z.object({
  method: z.literal('CREDIT_CARD'),
  cardNumber: z.string().min(16).max(19),
  cardHolder: z.string().min(2),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/),
  cvv: z.string().length(3),
})

const eWalletPaymentSchema = z.object({
  method: z.literal('WALLET'),
  walletPhoneNo: z.string(),
})

export const paymentSchema = z.discriminatedUnion('method', [
  cashPaymentSchema,
  instapayPaymentSchema,
  cardPaymentSchema,
  eWalletPaymentSchema,
])

export const authStepSchema = z
  .object({
    customer_type: z.enum(['login', 'register', 'guest']).optional(),
    guest: z
      .object({
        email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
        phoneNumber: z.string(),
        name: z.string(),
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.customer_type === 'guest' && data.guest) {
      if (data.guest.email && data.guest.email !== '' && !z.string().email().safeParse(data.guest.email).success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['guest.email'],
          message: 'Please enter a valid email address',
        })
      }
      if (!data.guest.phoneNumber) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['guest.phone'],
          message: 'Phone is required for guest',
        })
      }
      if (!data.guest.name) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['guest.name'],
          message: 'Name is required for guest',
        })
      }
    }
  })
