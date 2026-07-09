import { useCart } from '../hooks/useCart.js'
import { CartContext } from './cartContext.js'

// CartProvider est rendu dans main.jsx autour de <App>
export function CartProvider({ children }) {
  const cart = useCart()

  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  )
}
