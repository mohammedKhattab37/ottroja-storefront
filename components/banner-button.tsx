import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

function BannerButton({
  className,
  text,
  disabled = false,
  url,
  size = 'md',
}: {
  className: string
  text: string
  disabled?: boolean
  url: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const sizes = {
    sm: 'px-4 text-xs',
    md: 'px-6 text-sm',
    lg: 'px-8 text-base',
  }[size]

  return (
    <Link
      href={disabled ? '/' : url}
      className={cn(
        'bg-secondary text-secondary-foreground inline-block w-fit rounded-full py-3 text-center font-bold transition-colors',
        disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-secondary/90',
        sizes,
        className,
      )}
      onClick={(e) => disabled && e.preventDefault()}
      aria-disabled={disabled ? 'true' : 'false'}
      tabIndex={disabled ? -1 : undefined}
    >
      {text}
    </Link>
  )
}

export default BannerButton
