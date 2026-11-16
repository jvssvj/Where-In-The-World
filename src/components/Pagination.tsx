import { useEffect, useState } from 'react'
import { getPageItems } from '../lib/pagination'

interface PaginationProps {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

const base =
  'flex h-9 min-w-9 items-center justify-center rounded-[.3rem] font-semibold shadow-card transition duration-200 ease-in-out active:scale-[.92] disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100 tablet:h-[43px] tablet:min-w-[43px] dark:shadow-card-dark'
const idle = 'bg-white text-lm-text dark:bg-dm-elements dark:text-white'
const current = 'bg-lm-text text-white dark:bg-white dark:text-lm-text'

// Same value as `--breakpoint-tablet` in index.css
const isTabletQuery = '(min-width: 756px)'

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    const updateMatches = () => setMatches(mediaQuery.matches)

    updateMatches()
    mediaQuery.addEventListener('change', updateMatches)
    return () => mediaQuery.removeEventListener('change', updateMatches)
  }, [query])

  return matches
}

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-4 tablet:hidden"
    >
      <path d={direction === 'left' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'} />
    </svg>
  )
}

export default function Pagination({ page, totalPages, onChange }: PaginationProps) {
  const isTablet = useMediaQuery(isTabletQuery)

  if (totalPages <= 1) return null

  return (
    <nav
      aria-label="Pagination"
      className="mt-16 flex w-full max-w-page flex-wrap items-center justify-center gap-1 px-4 tablet:gap-2 tablet:px-20"
    >
      <button
        type="button"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className={`${base} ${idle} tablet:px-4`}
      >
        <Chevron direction="left" />
        <span className="hidden tablet:inline">Previous</span>
      </button>

      <ol className="flex items-center gap-1 tablet:gap-2">
        {getPageItems(page, totalPages, isTablet ? 7 : 5).map((item) =>
          typeof item === 'number' ? (
            <li key={item}>
              <button
                type="button"
                aria-label={`Page ${item}`}
                aria-current={item === page ? 'page' : undefined}
                onClick={() => onChange(item)}
                className={`${base} ${item === page ? current : idle} px-2 tablet:px-3`}
              >
                {item}
              </button>
            </li>
          ) : (
            <li
              key={item}
              aria-hidden="true"
              className="px-0.5 font-semibold text-lm-input tablet:px-1 dark:text-dm-muted"
            >
              …
            </li>
          ),
        )}
      </ol>

      <button
        type="button"
        aria-label="Next page"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className={`${base} ${idle} tablet:px-4`}
      >
        <span className="hidden tablet:inline">Next</span>
        <Chevron direction="right" />
      </button>
    </nav>
  )
}
