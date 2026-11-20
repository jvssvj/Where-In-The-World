import type { CountryDetail, CountrySummary } from '../types/country'

const BASE_URL = 'https://api.restcountries.com/countries/v5'

const API_KEY = import.meta.env.VITE_RESTCOUNTRIES_API_KEY || 'rc_live_demo'

const PAGE_SIZE = 100
const MAX_PAGES = 10


const SUMMARY_FIELDS = 'names.common,codes.alpha_3,flag.url_svg,population,region,capitals'

interface ApiCountry {
  names: { common: string; official: string }
  codes: { alpha_2: string; alpha_3: string }
  flag: { url_svg: string }
  population: number
  region: string
  subregion?: string
  capitals?: { name: string; primary?: boolean }[]
  currencies?: { code: string; name: string; symbol?: string }[]
  languages?: { name: string; bcp47?: string }[]
  borders?: string[]
  tlds?: string[]
}

interface ApiResponse {
  data: {
    objects: ApiCountry[]
    meta?: { total: number; count: number; limit: number; offset: number; more: boolean }
  }
}

async function request(path: string, signal?: AbortSignal) {
  const resp = await fetch(`${BASE_URL}${path}`, {
    method: 'GET',
    signal,
    headers: { Authorization: `Bearer ${API_KEY}` },
  })

  if (resp.status === 401 || resp.status === 403) throw new Error('Invalid or missing API key.')
  if (resp.status === 429) throw new Error('Too many requests. Please try again in a moment.')
  if (!resp.ok) throw new Error('No results found.')

  return ((await resp.json()) as ApiResponse).data
}

function toSummary(c: ApiCountry): CountrySummary {
  return {
    cca3: c.codes.alpha_3,
    name: { common: c.names.common },
    flags: { svg: c.flag.url_svg },
    population: c.population,
    region: c.region,
    capital: c.capitals?.map((capital) => capital.name),
  }
}

function toDetail(c: ApiCountry): CountryDetail {
  return {
    ...toSummary(c),
    name: { common: c.names.common, official: c.names.official },
    subregion: c.subregion,
    tld: c.tlds,
    currencies: c.currencies,
    languages: c.languages,
    borders: c.borders,
  }
}

export async function fetchAllCountries(signal?: AbortSignal) {
  const byCode = new Map<string, CountrySummary>()

  for (let page = 0; page < MAX_PAGES; page++) {
    const { objects, meta } = await request(
      `?response_fields=${SUMMARY_FIELDS}&limit=${PAGE_SIZE}&offset=${page * PAGE_SIZE}`,
      signal,
    )

    const before = byCode.size
    for (const country of objects.map(toSummary)) byCode.set(country.cca3, country)

    // para quando a API diz que acabou, ou quando a página não trouxe nada novo
    if (!meta?.more || byCode.size === before) break
  }

  return [...byCode.values()]
}

export async function fetchCountryByCode(code: string, signal?: AbortSignal) {
  const { objects } = await request(`/codes.alpha_3/${encodeURIComponent(code)}`, signal)

  if (!objects[0]) throw new Error('No results found.')
  return toDetail(objects[0])
}
