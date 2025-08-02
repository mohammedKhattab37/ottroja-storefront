import { Bundle } from '@/app/[locale]/(main)/_actions/get-bundles'
import { getCustomerSession } from '@/app/[locale]/(main)/_auth/_actions/get-session'
import {
  getServerCart,
  saveServerCart,
} from '@/app/[locale]/(main)/checkout/_components/_actions/cart-actions'
import {
  addItemToDB,
  removeItemFromDB,
  updateItemInDB,
} from '@/app/[locale]/(main)/checkout/_components/_actions/cart-item-actions'
import { ProductVariant } from '@/app/[locale]/(main)/products/_actions/types'
import { zoneDelivery } from '@/lib/constants'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name_ar: string
  name_en: string
  cartId?: string
  image: string
  slug: string
  quantity: number

  productVariant?: ProductVariant
  productVariantId?: string
  bundle?: Bundle
  bundleId?: string
}

interface CartState {
  items: CartItem[]
  delivery: number
  couponAmount: number
  openPackage: boolean
  openPackageFee: number
  isLoading: boolean
  error: string | null
  isUserLoggedIn: () => Promise<boolean>

  // Actions
  getDeliveryFee: (zone: string) => void
  addItem: (item: CartItem) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCartItems: () => void
  clearCoupon: () => void

  // Computed values
  getTotalItems: () => number
  getSubtotal: (noDelivery?: boolean) => number
  getTotalPrice: (noDelivery?: boolean) => number

  // API actions
  saveToServer: () => Promise<void>
  loadFromServer: () => Promise<void>
  
  // Inventory adjustment actions
  adjustItemQuantity: (itemId: string, newQuantity: number) => void
  removeItemByVariantOrBundle: (variantId?: string, bundleId?: string) => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      delivery: 0,
      couponAmount: 0,
      openPackage: false,
      openPackageFee: 10,
      isLoading: false,
      error: null,
      isUserLoggedIn: async () => {
        const currentSession = await getCustomerSession()
        if (currentSession.success) {
          return true
        } else {
          return false
        }
      },

      getDeliveryFee: (zone) => {
        const fee = zoneDelivery.find((deliveryZone) => deliveryZone.name == zone)?.fee
        set({ delivery: fee || 0 })
      },

      addItem: async (newItem) => {
        set({ isLoading: true })
        const isLoggedIn = await get().isUserLoggedIn()
        
        // Clear coupon when cart is modified
        get().clearCoupon()
        
        // save on server if customer registered
        if (isLoggedIn) {
          addItemToDB(newItem)
          get().loadFromServer()
        } else {
          const items = get().items
          const existingItem = newItem.bundleId
            ? items.find((item) => item.id === newItem.id && item.bundle?.id === newItem.bundle?.id)
            : items.find(
                (item) =>
                  item.id === newItem.id && item.productVariant?.id === newItem.productVariant?.id,
              )

          // Update quantity of existing item
          if (existingItem) {
            set({
              items: items.map((item) =>
                item.id === existingItem.id ? { ...item, quantity: newItem.quantity } : item,
              ),
            })
          } else {
            // Add new item
            const item: CartItem = newItem
            set({ items: [...items, item] })
          }
          set({ isLoading: false })
        }
      },

      removeItem: async (itemId) => {
        set({ isLoading: true })
        const isLoggedIn = await get().isUserLoggedIn()

        // Clear coupon when cart is modified
        get().clearCoupon()

        set({
          items: get().items.filter((item) => item.id !== itemId),
        })

        // remove from server if customer registered
        if (isLoggedIn) removeItemFromDB(itemId)
        set({ isLoading: false })
      },

      clearCartItems: () => {
        set({ items: [] })
        get().clearCoupon()
      },

      clearCoupon: () => {
        set({ couponAmount: 0 })
        // Clear coupon code from checkout store
        if (typeof window !== 'undefined') {
          const { useCheckoutStore } = require('@/stores/checkout')
          useCheckoutStore.setState({ couponCode: null })
        }
      },

      updateQuantity: async (itemId, quantity) => {
        const isLoggedIn = await get().isUserLoggedIn()

        if (quantity <= 0) {
          get().removeItem(itemId)
          return
        }

        // Clear coupon when cart is modified
        get().clearCoupon()

        set({
          items: get().items.map((item) => (item.id === itemId ? { ...item, quantity } : item)),
        })

        // update on server if customer registered
        if (isLoggedIn) {
          updateItemInDB(itemId, quantity)
        }
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) =>
            total + (item.productVariant?.price || item.bundle?.bundlePrice || 0) * item.quantity,
          0,
        )
      },

      getTotalPrice: (noDelivery = false) => {
        const delivery = noDelivery ? 0 : get().delivery
        const openPackageFee = get().openPackage ? get().openPackageFee : 0
        const couponAmount = get().couponAmount
        const totalPrice = get().items.reduce(
          (total, item) =>
            total + (item.productVariant?.price || item.bundle?.bundlePrice || 0) * item.quantity,
          0,
        )
        return totalPrice + openPackageFee + delivery - couponAmount
      },

      saveToServer: async () => {
        try {
          const items = get().items
          const serverItems = await saveServerCart(items)
          set({ items: serverItems })
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to save to server' })
        }
      },

      loadFromServer: async () => {
        try {
          set({ isLoading: true, error: null })
          const serverItems = await getServerCart()
          set({ items: serverItems })
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to load from server' })
        } finally {
          set({ isLoading: false })
        }
      },

      adjustItemQuantity: (itemId, newQuantity) => {
        if (newQuantity <= 0) {
          get().removeItem(itemId)
        } else {
          // Clear coupon when cart is modified
          get().clearCoupon()
          
          set({
            items: get().items.map((item) => 
              item.id === itemId ? { ...item, quantity: newQuantity } : item
            ),
          })
        }
      },

      removeItemByVariantOrBundle: (variantId, bundleId) => {
        // Clear coupon when cart is modified
        get().clearCoupon()
        
        set({
          items: get().items.filter((item) => {
            if (variantId && item.productVariantId === variantId) {
              return false
            }
            if (bundleId && item.bundleId === bundleId) {
              return false
            }
            return true
          }),
        })
      },
    }),
    {
      name: 'cart-storage',
      // Only persist items, not loading states
      partialize: (state) => ({ items: state.items }),
    },
  ),
)
