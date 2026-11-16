import { SearchIcon } from './Icons'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <label htmlFor="search-countries" className="sr-only">
        Search Countries
      </label>

      <SearchIcon className="pointer-events-none absolute top-1/2 left-8 size-[25px] -translate-y-1/2 text-lm-text dark:text-white" />

      <input
        id="search-countries"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for a country..."
        className="h-[55px] w-full max-w-[480px] rounded-lg bg-white pl-16 text-lm-text shadow-card transition-colors duration-500 placeholder:text-lm-input dark:bg-dm-elements dark:text-white dark:shadow-card-dark dark:placeholder:text-dm-muted"
      />
    </div>
  )
}
