import { useState, useEffect, useCallback, useMemo } from 'react'

const STORAGE_KEY = 'react-shop-cart'

/**
 * useCart — gère le tableau du panier avec persistance localStorage.
 *
 * @returns {{
 *   cart         : Array,          — liste des articles { ...product, qty }
 *   addToCart    : (product) => void,
 *   removeFromCart : (id) => void,
 *   clearCart    : () => void,
 *   cartCount    : number,         — nombre total d'articles (somme des qty)
 *   cartTotal    : number          — prix total (somme de price × qty)
 * }}
 */
export function useCart() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  const addToCart = useCallback((product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        )
      }

      return [...prevCart, { ...product, qty: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart],
  )

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart],
  )

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    cartCount,
    cartTotal,
  }
}
