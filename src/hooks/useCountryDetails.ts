import { useEffect, useState } from 'react'
import { fetchCountryByCode } from '../api/countries'
import type { CountryDetail } from '../types/country'

// Module-level cache: revisiting a country (Back, or a border you already saw) doesn't refetch.
const cache = new Map<string, CountryDetail>()

interface Result {
  code: string
  country?: CountryDetail
  error?: string
}

/** Loads one country by cca3 code. Everything returned always belongs to the `code` you passed. */
export function useCountryDetails(code: string) {
  const [result, setResult] = useState<Result | null>(null)

  useEffect(() => {
    if (!code || cache.has(code)) return

    const controller = new AbortController()

    fetchCountryByCode(code, controller.signal)
      .then((country) => {
        cache.set(code, country)
        setResult({ code, country })
      })
      .catch((err: Error) => {
        if (!controller.signal.aborted) setResult({ code, error: err.message })
      })

    return () => controller.abort()
  }, [code])

  const current = result?.code === code ? result : null
  const country = cache.get(code) ?? current?.country ?? null
  const error = country ? null : (current?.error ?? null)

  return { country, error, isLoading: !country && !error }
}
