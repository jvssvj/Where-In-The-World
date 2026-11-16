import { useOutletContext } from 'react-router'
import type { useCountries } from './useCountries'

/** The country list is fetched once in <Layout> and shared with every page through <Outlet context>. */
export type CountriesContext = ReturnType<typeof useCountries>

export function useCountriesContext() {
  return useOutletContext<CountriesContext>()
}
