import { useState, useEffect } from 'react'

/**
 * useDebounce — retourne une copie "retardée" de `value`.
 * La valeur ne se met à jour qu'après `delay` ms sans changement.
 *
 * @param {any}    value — la valeur à déboncer (ex : searchQuery)
 * @param {number} delay — délai en millisecondes (ex : 400)
 * @returns {any}  debouncedValue
 */
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
