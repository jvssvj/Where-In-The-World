import { useEffect, useState } from 'react'
import { fetchAllCountries } from '../api/countries'
import type { CountrySummary } from '../types/country'

export function useCountries() {
  const [countries, setCountries] = useState<CountrySummary[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    fetchAllCountries(controller.signal)
      .then(setCountries)
      .catch((err: Error) => {
        if (!controller.signal.aborted) setError(err.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false)
      })

    return () => controller.abort()
  }, [])

  return { countries, isLoading, error }
}
