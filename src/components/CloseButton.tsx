import { CloseIcon } from './Icons'

interface CloseButtonProps {
  onClick: () => void
}

export default function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[43px] w-[139px] items-center justify-center gap-2 rounded-[.3rem] bg-white text-lm-text shadow-card transition duration-200 ease-in-out active:scale-[.92] dark:bg-dm-elements dark:text-white dark:shadow-card-dark"
    >
      <CloseIcon className="size-4" />
      Close
    </button>
  )
}
