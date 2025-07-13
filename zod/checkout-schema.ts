import { z } from 'zod'

export const addressSchema = z.object({
  country: z.string().min(1, 'Please choose a country'),
  governorate: z.string().min(1, 'Please choose a governorate'),
  city: z.string().min(1, 'Please choose a city'),
  district: z.string().min(1, 'Please enter a district'),
  building: z.string().min(1, 'Please enter the building No.'),
  apartment: z.string().min(1, 'Please enter the apartment No.'),
  postal_code: z.string().min(1, 'Please enter the postal code'),
  extra_address: z.string().optional(),
})

const cashPaymentSchema = z.object({
  method: z.literal('cash'),
})

const cardPaymentSchema = z.object({
  method: z.literal('card'),
  cardNumber: z.string().min(16).max(19),
  cardHolder: z.string().min(2),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/),
  cvv: z.string().length(3),
})

const eWalletPaymentSchema = z.object({
  method: z.literal('e-wallet'),
  walletPhoneNo: z.string(),
})

export const paymentSchema = z.discriminatedUnion('method', [
  cashPaymentSchema,
  cardPaymentSchema,
  eWalletPaymentSchema,
])

export const completeFormSchema = z.object({
  // Address fields (Step 1)
  address: addressSchema,

  // Payment fields (Step 2)
  payment: paymentSchema,
})
