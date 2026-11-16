import type { CountrySummary } from '../types/country'

/** Alphabetical by common name ("Åland Islands" lands between "Afghanistan" and "Albania"). */
export function sortByName(countries: CountrySummary[]): CountrySummary[] {
  return [...countries].sort((a, b) => a.name.common.localeCompare(b.name.common, 'en'))
}

export function filterCountries(
  countries: CountrySummary[],
  search: string,
  region: string,
): CountrySummary[] {
  const query = search.trim().toLowerCase()

  return countries.filter(
    (c) =>
      (!region || c.region === region) && (!query || c.name.common.toLowerCase().includes(query)),
  )
}

export const FEATURED_FIRST = ['DEU', 'USA', 'BRA', 'ISL', 'AFG', 'ALA', 'ALB', 'DZA']

export function pinFeatured(countries: CountrySummary[]): CountrySummary[] {
  const byCode = new Map(countries.map((c) => [c.cca3, c]))
  const featured = FEATURED_FIRST.flatMap((code) => byCode.get(code) ?? [])
  const rest = countries.filter((c) => !FEATURED_FIRST.includes(c.cca3))

  return [...featured, ...rest]
}