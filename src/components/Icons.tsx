/**
 * Inline versions of the original SVG files. Each icon renders its light- and
 * dark-mode variant and lets Tailwind's `dark:` variant pick which one is visible.
 */
interface IconProps {
  className?: string
}

export function MoonIcon({ className = '' }: IconProps) {
  return (
    <>
      <svg
        viewBox="0 0 512 512"
        fill="currentColor"
        aria-hidden="true"
        className={`${className} dark:hidden`}
      >
        <path d="M264 480A232 232 0 0132 248c0-94 54-178.28 137.61-214.67a16 16 0 0121.06 21.06C181.07 76.43 176 104.66 176 136c0 110.28 89.72 200 200 200 31.34 0 59.57-5.07 81.61-14.67a16 16 0 0121.06 21.06C442.28 426 358 480 264 480z" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={`${className} hidden dark:block`}
      >
        <path d="M3.32031 11.6835C3.32031 16.6541 7.34975 20.6835 12.3203 20.6835C16.1075 20.6835 19.3483 18.3443 20.6768 15.032C19.6402 15.4486 18.5059 15.6834 17.3203 15.6834C12.3497 15.6834 8.32031 11.654 8.32031 6.68342C8.32031 5.50338 8.55165 4.36259 8.96453 3.32996C5.65605 4.66028 3.32031 7.89912 3.32031 11.6835Z" />
      </svg>
    </>
  )
}

export function SearchIcon({ className = '' }: IconProps) {
  return (
    <>
      <svg
        viewBox="0 0 512 512"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="32"
        aria-hidden="true"
        className={`${className} dark:hidden`}
      >
        <path d="M256 80a176 176 0 10176 176A176 176 0 00256 80z" />
        <path d="M232 160a72 72 0 1072 72 72 72 0 00-72-72z" />
        <path strokeLinecap="round" d="M283.64 283.64L336 336" />
      </svg>
      <svg
        viewBox="0 0 512 512"
        fill="currentColor"
        aria-hidden="true"
        className={`${className} hidden dark:block`}
      >
        <path d="M256 64C150.13 64 64 150.13 64 256s86.13 192 192 192 192-86.13 192-192S361.87 64 256 64zm91.31 283.31a16 16 0 01-22.62 0l-42.84-42.83a88.08 88.08 0 1122.63-22.63l42.83 42.84a16 16 0 010 22.62z" />
        <circle cx="232" cy="232" r="56" />
      </svg>
    </>
  )
}

export function ChevronIcon({ className = '' }: IconProps) {
  return (
    <>
      <svg
        viewBox="0 0 512 512"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        aria-hidden="true"
        className={`${className} dark:hidden`}
      >
        <path d="M352 296l-96-96-96 96" />
        <path strokeMiterlimit="10" d="M256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64z" />
      </svg>
      <svg
        viewBox="0 0 512 512"
        fill="currentColor"
        aria-hidden="true"
        className={`${className} hidden dark:block`}
      >
        <path d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208 208-93.13 208-208S370.87 48 256 48zm96 270.63l-96-96-96 96L137.37 296 256 177.37 374.63 296z" />
      </svg>
    </>
  )
}

export function CloseIcon({ className = '' }: IconProps) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="48"
      aria-hidden="true"
      className={className}
    >
      <path d="M368 368L144 144M368 144L144 368" />
    </svg>
  )
}
