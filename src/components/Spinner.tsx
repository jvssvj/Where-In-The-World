interface SpinnerProps {
  className?: string
}

export default function Spinner({ className = '' }: SpinnerProps) {
  return (
    <div role="status" className={className}>
      <span className="sr-only">Loading…</span>
      <span
        aria-hidden="true"
        className="inline-block size-[50px] animate-spin rounded-full border-4 border-lm-text border-b-transparent dark:border-white dark:border-b-transparent"
      />
    </div>
  )
}
