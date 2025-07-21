import { create } from 'zustand'

interface AuthState {
  modal_type: 'login' | 'register'
  open_modal: boolean
  error: string | null

  // Actions
  setAuthModalType: (type: 'login' | 'register') => void
  toggleModal: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  modal_type: 'login',
  open_modal: false,
  error: null,

  setAuthModalType: (type) => {
    set({ modal_type: type })
  },
  toggleModal: () => {
    set({ open_modal: !get().open_modal })
  },
}))
