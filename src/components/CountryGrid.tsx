import { useLayoutEffect, useRef } from 'react'
import { playGridAnimation } from '../lib/animations'
import type { CountrySummary } from '../types/country'
import CountryCard from './CountryCard'

interface CountryGridProps {
  countries: CountrySummary[]
}

export default function CountryGrid({ countries }: CountryGridProps) {
  const gridRef = useRef<HTMLElement>(null)

  // Slide the grid in every time the list (or the page) changes
  useLayoutEffect(() => {
    if (!gridRef.current) return
    const ctx = playGridAnimation(gridRef.current)
    return () => ctx.revert()
  }, [countries])

  return (
    <main
      ref={gridRef}
      className="flex w-full max-w-page flex-wrap items-start justify-center gap-[4.6875rem] px-4 tablet:px-[4.6875rem]"
    >
      {countries.map((country) => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </main>
  )
}
