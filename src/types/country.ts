/** What the UI works with. `api/countries.ts` maps the REST Countries v5 payload onto these. */
export interface CountrySummary {
  cca3: string
  name: { common: string }
  flags: { svg: string }
  population: number
  region: string
  capital?: string[]
}

export interface CountryDetail extends CountrySummary {
  name: { common: string; official: string }
  subregion?: string
  tld?: string[]
  currencies?: { code: string; name: string; symbol?: string }[]
  languages?: { name: string; bcp47?: string }[]
  borders?: string[]
}

export interface BorderCountry {
  code: string
  name: string
}
