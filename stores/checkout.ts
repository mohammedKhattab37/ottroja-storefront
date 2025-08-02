import { CreateAddress } from '@/app/[locale]/(main)/checkout/_actions/create-address'
import { CreateGuest } from '@/app/[locale]/(main)/checkout/_actions/create-guest'
import { CheckoutAddressData } from '@/app/[locale]/(main)/checkout/_components/form/address-step'
import { CheckoutCustomerData } from '@/app/[locale]/(main)/checkout/_components/form/customer-details-step'
import { CheckoutPaymentData } from '@/app/[locale]/(main)/checkout/_components/form/payment-method-step'
import { addressSchema, authStepSchema, paymentSchema } from '@/zod/checkout-schema'
import { create } from 'zustand'

interface CheckoutState {
  shippingAddressId: string | null
  couponCode: string | null
  customerId: string | null

  isSubmitting: boolean
  error: string | null

  // steps controls
  totalSteps: number
  currentStep: number
  isFirstStep: () => boolean
  isLastStep: () => boolean
  setTotalSteps: (num: number) => void
  next: () => void
  prev: () => void
  goTo: (step: number) => void

  // forms
  authForm: CheckoutCustomerData
  addressForm: CheckoutAddressData

  // Methods
  submitAuthForm: (authForm: CheckoutCustomerData) => Promise<boolean>
  submitAddressForm: (addressForm: CheckoutAddressData) => Promise<boolean>
  submitPaymentForm: (paymentForm: CheckoutPaymentData) => Promise<void>
}

export const useCheckoutStore = create<CheckoutState>((set, get) => ({
  shippingAddressId: null,
  couponCode: null,
  customerId: null,
  isSubmitting: false,
  error: null,

  currentStep: 0,
  totalSteps: 0,
  isFirstStep: () => get().currentStep === 0,
  isLastStep: () => get().currentStep === get().totalSteps - 1,
  setTotalSteps: (num) => set({ totalSteps: num }),
  next: () => {
    const currentStep = get().currentStep
    set({ currentStep: Math.min(currentStep + 1, get().totalSteps - 1) })
  },
  prev: () => {
    const currentStep = get().currentStep
    set({ currentStep: Math.max(currentStep - 1, 0) })
  },
  goTo: (step: number) => set({ currentStep: step }),

  authForm: {
    loggedInOrGuest: false,
    customer_type: undefined,
  },
  addressForm: {
    country: '',
    state: '',
    city: '',
    district: '',
    building: '',
    apartment: '',
    postal_code: '',
    zone: '',
    extra_address: undefined,
  },

  submitAuthForm: async (authForm) => {
    try {
      set({ isSubmitting: true })
      const validatedData = await authStepSchema.parseAsync(authForm)

      if (validatedData.customer_type == 'guest' && validatedData.guest) {
        const guestData = {
          name: validatedData.guest.name,
          phoneNumber: validatedData.guest.phoneNumber,
          email: validatedData.guest.email || '',
        }
        const guestCustomer = await CreateGuest(guestData)

        if (guestCustomer.success) {
          set({ customerId: guestCustomer.customer.id, isSubmitting: false })
          return true
        }
      }
      set({ isSubmitting: false })
      return false
    } catch (error) {
      console.error('Schema validation failed:', error)
      set({ isSubmitting: false })
      return false
    }
  },
  submitAddressForm: async (addressForm) => {
    try {
      set({ isSubmitting: true })
      const validatedData = await addressSchema.parseAsync(addressForm)
      const currentCustomer = get().customerId
      if (currentCustomer) {
        const addressData = {
          ...validatedData,
          customerId: currentCustomer,
          postal_code: validatedData.postal_code || '',
          extra_address: validatedData.extra_address || ''
        }
        const newAddress = await CreateAddress(addressData)
        if (newAddress.success) {
          set({ shippingAddressId: newAddress.address.id, isSubmitting: false })
          return true
        }
      }
      set({ isSubmitting: false })
      return false
    } catch (error) {
      console.error('Schema validation failed:', error)
      set({ isSubmitting: false })
      return false
    }
  },
  submitPaymentForm: async (paymentForm) => {
    await paymentSchema.parseAsync(paymentForm)
  },
}))
