import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import CountryGrid from '../components/CountryGrid'
import Footer from '../components/Footer'
import Pagination from '../components/Pagination'
import RegionFilter from '../components/RegionFilter'
import SearchBar from '../components/SearchBar'
import Spinner from '../components/Spinner'
import { useCountriesContext } from '../hooks/useCountriesContext'
import { PAGE_SIZE, paginate } from '../lib/pagination'
import { filterCountries, pinFeatured, sortByName } from '../lib/filterCountries'
import noResultsFound from '../assets/images/globe-search.webp'

const SEARCH_DEBOUNCE_MS = 600

function parsePage(value: string | null) {
  const page = Number.parseInt(value ?? '', 10)
  return Number.isFinite(page) && page > 0 ? page : 1
}

/**
 * Home. Where you are lives in the URL, so F5 / sharing / the browser's back button all work:
 *   /?q=bra&region=Americas&page=2
 */
export default function HomePage() {
  const { countries, isLoading, error } = useCountriesContext()
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get('q') ?? ''
  const region = searchParams.get('region') ?? ''

  // Always points at the latest params, so a debounced update never works from stale ones
  const paramsRef = useRef(searchParams)
  useEffect(() => {
    paramsRef.current = searchParams
  }, [searchParams])

  const updateParams = (changes: Record<string, string | null>, replace = false) => {
    const next = new URLSearchParams(paramsRef.current)
    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value)
      else next.delete(key)
    }
    setSearchParams(next, { replace })
  }

  /* ------------------------------- search box ------------------------------ */
  // The input is local state (typing stays instant); the URL — and so the list — follows after a pause.
  const [searchInput, setSearchInput] = useState(query)
  const debounceRef = useRef<number | undefined>(undefined)

  // Keep the input in sync when the URL changes from outside (browser back/forward, logo click…)
  useEffect(() => {
    setSearchInput((current) => {
      if (current.trim() === query) return current
      window.clearTimeout(debounceRef.current)
      return query
    })
  }, [query])

  useEffect(() => () => window.clearTimeout(debounceRef.current), [])

  const handleSearchChange = (value: string) => {
    setSearchInput(value)
    window.clearTimeout(debounceRef.current)

    debounceRef.current = window.setTimeout(() => {
      const trimmed = value.trim()
      if (trimmed === (paramsRef.current.get('q') ?? '')) return
      updateParams({ q: trimmed || null, page: null }, true) // replace: typing shouldn't flood the history
    }, SEARCH_DEBOUNCE_MS)
  }

  /* ---------------------------- region & pagination ------------------------- */
  const handleRegionChange = (value: string) => updateParams({ region: value || null, page: null })

  const handlePageChange = (value: number) => {
    updateParams({ page: value > 1 ? String(value) : null })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /* --------------------------------- data ----------------------------------- */
  const sorted = useMemo(() => sortByName(countries), [countries])
  const filtered = useMemo(() => {
    const result = filterCountries(sorted, query, region)
    return query.trim() || region ? result : pinFeatured(result)
  }, [sorted, query, region])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const page = Math.min(parsePage(searchParams.get('page')), totalPages)
  const visibleCountries = useMemo(() => paginate(filtered, page), [filtered, page])

  const isEmpty = !isLoading && !error && filtered.length === 0

  return (
    <>
      <nav
        data-reveal="nav"
        className="z-2 my-12 flex w-full max-w-page flex-col items-start gap-4 px-4 tablet:flex-row tablet:items-center tablet:justify-between tablet:gap-[4.6875rem] tablet:px-20"
      >
        <SearchBar value={searchInput} onChange={handleSearchChange} />
        <RegionFilter region={region} onChange={handleRegionChange} />
      </nav>

      <div className="flex w-full items-center justify-center">
        {/* Fixed layer from just under the header (81px) to the bottom of the screen → true centre of the visible area */}
        {isLoading && (
          <Spinner className="pointer-events-none fixed inset-x-0 top-[81px] bottom-0 z-2 flex items-center justify-center" />
        )}

        <CountryGrid countries={visibleCountries} />
      </div>

      {isEmpty && (
        <div role="status" className="relative top-[10rem] flex flex-col items-center gap-6 px-4 text-center">
          <img src={noResultsFound} alt="" className="w-[130px] max-w-xs" />
          <p className="text-xl font-semibold text-lm-text dark:text-white">No results found</p>
        </div>
      )}

      {error && (
        <p role="status" className="text-xl font-semibold text-lm-text dark:text-white">
          {error}
        </p>
      )}

      {!isLoading && <Pagination page={page} totalPages={totalPages} onChange={handlePageChange} />}
      {!isLoading && <Footer />}
    </>
  )
}
