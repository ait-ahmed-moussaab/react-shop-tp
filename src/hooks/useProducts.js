import { useState, useEffect } from 'react'

const BASE_URL = 'https://dummyjson.com/products'
export const PAGE_SIZE = 12

/**
 * useProducts — récupère les produits depuis l'API dummyjson.
 *
 * Endpoints :
 *   • Pagination : GET /products?limit=12&skip=N
 *   • Recherche  : GET /products/search?q=mot&limit=12&skip=N
 *
 * Réponse API : { products: [...], total: 194, skip: 0, limit: 12 }
 *
 * @param {string} searchQuery — mot-clé de recherche (vide = parcourir)
 * @param {number} page        — numéro de page, 1-based
 * @returns {{ products: Array, total: number, loading: boolean, error: string|null }}
 */
export function useProducts(searchQuery, page) {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadProducts() {
      setLoading(true)
      setError(null)

      const skip = (page - 1) * PAGE_SIZE
      const trimmedQuery = searchQuery.trim()
      const params = new URLSearchParams({
        limit: String(PAGE_SIZE),
        skip: String(skip),
      })

      const url = trimmedQuery
        ? `${BASE_URL}/search?q=${encodeURIComponent(trimmedQuery)}&${params}`
        : `${BASE_URL}?${params}`

      try {
        const response = await fetch(url, { signal: controller.signal })

        if (!response.ok) {
          throw new Error('Impossible de charger les produits.')
        }

        const data = await response.json()
        setProducts(data.products ?? [])
        setTotal(data.total ?? 0)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setProducts([])
          setTotal(0)
          setError(err.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadProducts()

    return () => {
      controller.abort()
    }
  }, [searchQuery, page])

  return { products, total, loading, error }
}
