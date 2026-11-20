import CloseButton from './CloseButton'

interface CountryDetailSkeletonProps {
  onClose: () => void
}

const bar = 'animate-pulse rounded bg-lm-input/25 dark:bg-white/10'

/** A row of text: the wrapper has the line height of the real text, the bar is the "words". */
function Line({ width }: { width: string }) {
  return (
    <div className="flex h-6 items-center">
      <div className={`${bar} h-4 ${width}`} />
    </div>
  )
}

/**
 * Same layout as <CountryDetail> while the country is loading: the flag box has the exact
 * size of the real flag, so the page doesn't jump when the data arrives.
 * Close stays clickable.
 */
export default function CountryDetailSkeleton({ onClose }: CountryDetailSkeletonProps) {
  return (
    <div
      role="status"
      aria-busy="true"
      className="flex w-full max-w-[760px] flex-col items-center gap-8 px-8 pb-24 desktop:max-w-page desktop:flex-row desktop:items-end desktop:justify-center"
    >
      <span className="sr-only">Loading…</span>

      <div className="w-full desktop:w-auto">
        <div className="mt-8 mb-16 flex items-center justify-between desktop:mt-16">
          <CloseButton onClick={onClose} />
        </div>

        {/* Flag */}
        <div
          className={`${bar} aspect-[3/2] w-full rounded-[.2rem] desktop:aspect-auto desktop:h-[300px] desktop:min-w-[560px]`}
        />
      </div>

      <div className="flex w-full flex-col desktop:w-auto">
        <div className={`${bar} h-8 w-48`} />

        <div className="mt-8 mb-20 flex w-full flex-wrap gap-8 desktop:flex-nowrap">
          <div className="flex min-w-[220px] flex-col gap-[.3rem]">
            <Line width="w-56" />
            <Line width="w-44" />
            <Line width="w-36" />
            <Line width="w-48" />
            <Line width="w-40" />
          </div>

          <div className="flex min-w-[220px] flex-col gap-[.3rem]">
            <Line width="w-48" />
            <Line width="w-44" />
            <Line width="w-52" />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className={`${bar} h-4 w-36`} />
          <div className={`${bar} h-[29px] w-24`} />
          <div className={`${bar} h-[29px] w-24`} />
          <div className={`${bar} h-[29px] w-24`} />
        </div>
      </div>
    </div>
  )
}
