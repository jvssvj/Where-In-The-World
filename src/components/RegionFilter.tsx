import { useState } from 'react'
import { ChevronIcon } from './Icons'

// `value` is what the REST Countries API calls the region; `label` is what the menu shows.
const REGIONS = [
  { label: 'Africa', value: 'Africa' },
  { label: 'America', value: 'Americas' },
  { label: 'Asia', value: 'Asia' },
  { label: 'Europe', value: 'Europe' },
  { label: 'Oceania', value: 'Oceania' },
]

interface RegionFilterProps {
  /** Selected region, or '' when there is none. */
  region: string
  onChange: (region: string) => void
}

export default function RegionFilter({ region, onChange }: RegionFilterProps) {
  const [isOpen, setIsOpen] = useState(false)

  const select = (value: string) => {
    onChange(value)
    setIsOpen(false)
  }

  return (
    <div className="relative w-full max-w-[200px]">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="region-menu"
        onClick={() => setIsOpen((open) => !open)}
        className={`relative z-3 flex h-[55px] w-full items-center justify-between rounded-lg bg-white p-6 text-lm-text shadow-card transition duration-200 ease-in-out active:scale-[.92] dark:bg-dm-elements dark:text-white dark:shadow-card-dark ${region ? 'font-black' : 'font-medium'}`}
      >
        <span>{region || 'Filter by Region'}</span>
        <ChevronIcon
          className={`w-5 transition-transform duration-200 ease-in-out ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        id="region-menu"
        className={`absolute z-2 mt-1 flex w-full flex-col items-start gap-[.35rem] rounded-lg bg-white p-6 shadow-card transition-[opacity,transform,visibility] duration-200 ease-in-out dark:bg-dm-elements dark:shadow-card-dark ${isOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-20 opacity-0'}`}
      >
        {REGIONS.map(({ label, value }) => (
          <button
            key={value}
            type="button"
            aria-pressed={region === value}
            onClick={() => select(value)}
            className={`text-sm text-lm-text transition duration-200 ease-in-out active:scale-[.92] dark:text-white ${region === value ? 'font-black' : 'font-semibold'}`}
          >
            {label}
          </button>
        ))}

        <button
          type="button"
          onClick={() => select('')}
          className="mt-4 text-sm font-semibold text-lm-text transition duration-200 ease-in-out active:scale-[.92] dark:text-white"
        >
          Clear Filter
        </button>
      </div>
    </div>
  )
}
