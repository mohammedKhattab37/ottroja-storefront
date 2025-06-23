import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { Input } from './ui/input'

function InputWithIcon({
  classNames,
  name,
  placeholder,
  direction = 'ltr',
  icon,
}: {
  classNames?: string
  name: string
  placeholder?: string
  direction: string
  icon: ReactNode
}) {
  return (
    <div className="hidden items-center md:grid">
      <div className="relative" dir={direction}>
        <div className="absolute top-2.5 ms-2 h-4 w-4">{icon}</div>
        <Input
          id={name}
          type="search"
          placeholder={placeholder}
          dir={direction}
          className={cn('ps-9', classNames)}
        />
      </div>
    </div>
  )
}

export default InputWithIcon
