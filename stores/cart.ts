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
  //bundle?: Bundle
}

interface CartState {
  items: CartItem[]
  isLoading: boolean
  error: string | null
  isUserLoggedIn: () => Promise<boolean>

  // Actions
  addItem: (item: CartItem) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCartItems: () => void

  // Computed values
  getTotalItems: () => number
  getTotalPrice: () => number

  // API actions
  saveToServer: () => Promise<void>
  loadFromServer: () => Promise<void>
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      error: null,
      isUserLoggedIn: async () => {
        const currentSession = await getCustomerSession()
        console.log(currentSession)
        if (currentSession.success) {
          return true
        } else {
          return false
        }
      },

      addItem: async (newItem) => {
        const isLoggedIn = await get().isUserLoggedIn()
        // save on server if customer registered
        if (isLoggedIn) {
          addItemToDB(newItem)
          get().loadFromServer()
        } else {
          const items = get().items
          const existingItem = items.find(
            (item) =>
              item.id === newItem.id && item.productVariant?.id === newItem.productVariant?.id,
          )

          // Update quantity of existing item
          if (existingItem) {
            set({
              items: items.map((item) =>
                item.id === existingItem.id
                  ? { ...item, quantity: item.quantity + newItem.quantity }
                  : item,
              ),
            })
          } else {
            // Add new item
            const item: CartItem = newItem
            set({ items: [...items, item] })
          }
        }
      },

      removeItem: async (itemId) => {
        const isLoggedIn = await get().isUserLoggedIn()

        set({
          items: get().items.filter((item) => item.id !== itemId),
        })

        // remove from server if customer registered
        if (isLoggedIn) removeItemFromDB(itemId)
      },

      clearCartItems: () => {
        set({ items: [] })
      },

      updateQuantity: async (itemId, quantity) => {
        const isLoggedIn = await get().isUserLoggedIn()

        if (quantity <= 0) {
          get().removeItem(itemId)
          return
        }

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

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + (item.productVariant?.price || 0) * item.quantity,
          0,
        )
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
    }),
    {
      name: 'cart-storage',
      // Only persist items, not loading states
      partialize: (state) => ({ items: state.items }),
    },
  ),
)
