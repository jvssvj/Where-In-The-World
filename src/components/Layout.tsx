import { useEffect, useLayoutEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router'
import { useCountries } from '../hooks/useCountries'
import type { CountriesContext } from '../hooks/useCountriesContext'
import { useTheme } from '../hooks/useTheme'
import { playIntroAnimation } from '../lib/animations'
import Header from './Header'

/** Header + whatever page the router renders. Lives across navigations, so the theme and the country list persist. */
export default function Layout() {
  const rootRef = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()

  const { theme, toggleTheme } = useTheme()
  const countries = useCountries()

  useLayoutEffect(() => {
    if (!rootRef.current) return
    const ctx = playIntroAnimation(rootRef.current)
    return () => ctx.revert()
  }, [])

  // A new page (home ↔ country) should start at the top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div ref={rootRef} className="flex min-h-screen w-full flex-col items-center">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <Outlet context={countries satisfies CountriesContext} />
    </div>
  )
}
