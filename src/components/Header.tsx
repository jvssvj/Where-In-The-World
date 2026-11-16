import { Link } from 'react-router'
import type { Theme } from '../hooks/useTheme'
import { MoonIcon } from './Icons'

interface HeaderProps {
  theme: Theme
  onToggleTheme: () => void
}

export default function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="relative z-5 flex w-full items-center justify-center bg-white shadow-card dark:bg-dm-elements dark:shadow-card-dark">
      <section className="flex h-[81px] w-full max-w-page items-center justify-between px-4 tablet:px-20">
        <h1 data-reveal="title" className="text-xl font-bold tablet:text-2xl">
          <Link to="/" className="text-lm-text dark:text-white">
            Where in the world?
          </Link>
        </h1>

        <button
          type="button"
          data-reveal="theme"
          onClick={onToggleTheme}
          className="flex items-center justify-center gap-[.7rem] font-semibold text-lm-text dark:text-white"
        >
          <MoonIcon className="w-5" />
          {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </section>
    </header>
  )
}
