import { Link, useLocation } from 'react-router'
import type { CountrySummary } from '../types/country'
import standardFlag from "../assets/images/standard-flag.webp"
import FlagImage from './FlagImage'

interface CountryCardProps {
  country: CountrySummary
}

const label = 'flex gap-[.3rem] font-semibold text-lm-text dark:text-white'
const value = 'font-normal text-lm-input dark:text-dm-muted'

export default function CountryCard({ country }: CountryCardProps) {
  const { name, flags, population, region, capital, cca3 } = country
  const { pathname, search } = useLocation()

  return (
    <article className="relative flex w-full max-w-[530px] flex-col items-start overflow-hidden rounded-[.3rem] bg-white shadow-card transition duration-200 ease-in-out tablet:max-w-[265px] dark:bg-dm-elements dark:shadow-card-dark">
      {/* Invisible link that makes the whole card clickable; `from` lets "Close" return to this exact page/filter */}
      <Link
        to={`/country/${cca3}`}
        state={{ from: pathname + search }}
        aria-label={`About the country ${name.common}`}
        className="absolute z-1 size-full"
      />

      {!flags.svg ? (
        <div className="flex items-center justify-center h-[161px] w-full object-cover shadow-card dark:shadow-card-dark">
          <img
            src={standardFlag}
            alt={`Flag of the country ${name.common}`}
            className="w-[100px]"
          />
        </div>
      ) : (
        <FlagImage
          src={flags.svg}
          alt={`Flag of the country ${name.common}`}
          className="h-[161px] w-full shadow-card dark:shadow-card-dark"
          imgClassName="size-full object-cover"
        />
      )}

      <div className="flex w-full flex-col items-start gap-1 px-[1.5625em] pt-4 pb-[2.875rem]">
        <h2 className="w-full text-xl font-extrabold text-lm-text dark:text-white">
          {name.common}
        </h2>
        <p className={label}>
          Population: <span className={value}>{population.toLocaleString('en-US')}</span>
        </p>
        <p className={label}>
          Region: <span className={value}>{region}</span>
        </p>
        <p className={label}>
          Capital: <span className={value}>{capital?.join(', ') || 'N/A'}</span>
        </p>
      </div>
    </article>
  )
}
