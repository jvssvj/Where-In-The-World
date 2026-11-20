import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router'
import { playDetailAnimation } from '../lib/animations'
import type { BorderCountry, CountryDetail as CountryDetailData } from '../types/country'
import CloseButton from './CloseButton'
import FlagImage from './FlagImage'

interface CountryDetailProps {
  country: CountryDetailData
  borders: BorderCountry[]
  /** Home URL (with page/search/region) that "Close" returns to; passed along to border links. */
  from: string
  onClose: () => void
}

const label = 'flex flex-wrap gap-[.3rem] font-semibold text-lm-text dark:text-white'
const value = 'font-normal text-lm-input dark:text-dm-muted'

export default function CountryDetail({
  country,
  borders,
  from,
  onClose,
}: CountryDetailProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!panelRef.current) return
    const ctx = playDetailAnimation(panelRef.current)
    return () => ctx.revert()
  }, [country.cca3])

  const currency = country.currencies?.[0]?.name
  const languages = country.languages?.map((language) => language.name).join(', ')

  return (
    <div
      ref={panelRef}
      className="flex w-full max-w-[760px] flex-col items-center gap-8 px-8 pb-24 desktop:max-w-page desktop:flex-row desktop:items-end desktop:justify-center"
    >
      <div data-reveal="flag" className="w-full desktop:w-auto">
        <div className="mt-8 mb-16 flex items-center justify-between desktop:mt-16">
          <CloseButton onClick={onClose} />
        </div>

        <FlagImage
          src={country.flags.svg}
          alt={`Flag of the country ${country.name.common}`}
          className="w-full rounded-[.2rem] shadow-card desktop:h-[300px] desktop:min-w-[560px] dark:shadow-card-dark"
          pendingClassName="aspect-[3/2] desktop:aspect-auto"
          imgClassName="block w-full object-contain desktop:h-full desktop:object-cover"
        />
      </div>

      <div data-reveal="details" className="flex w-full flex-col desktop:w-auto">
        <h2 className="w-full text-2xl font-extrabold text-lm-text dark:text-white">
          {country.name.common}
        </h2>

        <div className="mt-8 mb-20 flex w-full flex-wrap gap-8 desktop:flex-nowrap">
          <div className="flex flex-col gap-[.3rem]">
            <p className={label}>
              Native Name: <span className={value}>{country.name.official}</span>
            </p>
            <p className={label}>
              Population: <span className={value}>{country.population.toLocaleString('en-US')}</span>
            </p>
            <p className={label}>
              Region: <span className={value}>{country.region}</span>
            </p>
            <p className={label}>
              Sub Region: <span className={value}>{country.subregion ?? 'N/A'}</span>
            </p>
            <p className={label}>
              Capital: <span className={value}>{country.capital?.join(', ') || 'N/A'}</span>
            </p>
          </div>

          <div className="flex flex-col gap-[.3rem]">
            <p className={label}>
              Top Level Domain: <span className={value}>{country.tld?.join(', ') || 'N/A'}</span>
            </p>
            <p className={label}>
              Currencies: <span className={value}>{currency || 'N/A'}</span>
            </p>
            <p className={label}>
              Languages: <span className={value}>{languages || 'N/A'}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="flex gap-[.3rem] font-semibold text-lm-text dark:text-white">
            {borders.length > 0 ? 'Border Countries:' : 'Border Countries: None'}
          </span>

          {borders.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {borders.map((border) => (
                <Link
                  key={border.code}
                  to={`/country/${border.code}`}
                  state={{ from }}
                  className="flex h-[29px] items-center justify-center rounded-[.2rem] border border-[hsla(0,0%,0%,0.055)] bg-lm-bg px-6 font-normal text-lm-input shadow-card transition duration-200 ease-in-out active:scale-[.92] dark:bg-dm-bg dark:text-dm-muted dark:shadow-card-dark"
                >
                  {border.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
