import { useMemo } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router'
import CountryDetail from '../components/CountryDetail'
import Spinner from '../components/Spinner'
import { useCountriesContext } from '../hooks/useCountriesContext'
import { useCountryDetails } from '../hooks/useCountryDetails'
import { getFrom } from '../lib/routerState'
import type { BorderCountry } from '../types/country'

export default function CountryPage() {
  const code = (useParams().code ?? '').toUpperCase()
  const location = useLocation()
  const navigate = useNavigate()

  const { countries } = useCountriesContext()
  const { country, error, isLoading } = useCountryDetails(code)

  const from = getFrom(location.state)

  const close = () => navigate(from)

  const borders = useMemo<BorderCountry[]>(() => {
    if (!country?.borders) return []

    const byCode = new Map(countries.map((c) => [c.cca3, c.name.common]))
    return country.borders
      .filter((borderCode) => borderCode !== country.cca3)
      .map((borderCode) => ({ code: borderCode, name: byCode.get(borderCode) ?? borderCode }))
  }, [countries, country])

  return (
    <div className="flex w-full flex-1 flex-col items-center bg-white transition-colors duration-500 dark:bg-dm-elements">
      {country && (
        <CountryDetail
          country={country}
          borders={borders}
          from={from}
          onClose={close}
        />
      )}

      {isLoading && <Spinner className="mt-24" />}

      {error && (
        <div className="mt-24 flex flex-col items-center gap-8">
          <p role="status" className="text-xl font-semibold text-lm-text dark:text-white">
            {error}
          </p>
          <Link
            to={from}
            className="flex h-[43px] items-center justify-center rounded-[.3rem] bg-white px-8 font-semibold text-lm-text shadow-card transition duration-200 ease-in-out active:scale-[.92] dark:bg-dm-bg dark:text-white dark:shadow-card-dark"
          >
            Back to home
          </Link>
        </div>
      )}
    </div>
  )
}
