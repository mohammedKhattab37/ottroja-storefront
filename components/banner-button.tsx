import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

function BannerButton({
  className,
  text,
  url,
  size = 'md',
}: {
  className: string
  text: string
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
      href={url}
      className={cn(
        'bg-secondary text-secondary-foreground hover:bg-secondary/90 inline-block w-fit rounded-full py-3 text-center font-bold transition-colors',
        sizes,
        className,
      )}
    >
      {text}
    </Link>
  )
}

export default BannerButton
