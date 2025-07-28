'use client'
import { Toaster } from 'react-hot-toast'

export const ToasterProvider = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 8000,
        className: '!bg-background !text-foreground border',
      }}
    />
  )
}
