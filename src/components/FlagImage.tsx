import { useLayoutEffect, useRef, useState } from 'react'

interface FlagImageProps {
  src: string
  alt: string
  /** Size and shape of the box. The box is always on screen, so nothing jumps when the image arrives. */
  className?: string
  /** Extra classes for the box only while the image is still loading (e.g. a fallback aspect ratio). */
  pendingClassName?: string
  imgClassName?: string
}

/** An <img> that shows a pulsing placeholder in its box until the picture has loaded. */
export default function FlagImage({
  src,
  alt,
  className = '',
  pendingClassName = '',
  imgClassName = '',
}: FlagImageProps) {
  const imgRef = useRef<HTMLImageElement>(null)
  const [settledSrc, setSettledSrc] = useState<string | null>(null)
  const isLoaded = settledSrc === src // a new `src` starts over as "loading"

  // Cached images can finish before React attaches `onLoad`
  useLayoutEffect(() => {
    if (imgRef.current?.complete) setSettledSrc(src)
  }, [src])

  return (
    <div className={`relative overflow-hidden ${className} ${isLoaded ? '' : pendingClassName}`}>
      {!isLoaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-lm-input/25 dark:bg-white/10"
        />
      )}

      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={() => setSettledSrc(src)}
        onError={() => setSettledSrc(src)} // stop pulsing; the browser shows the alt text
        className={`${imgClassName} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  )
}
