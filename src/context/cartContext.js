import { createContext, useContext } from 'react'

export const CartContext = createContext(null)

export function useCartContext() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCartContext doit être utilisé dans un CartProvider')
  }
  return context
}
