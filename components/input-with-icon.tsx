import { cn } from '@/lib/utils'
import { ChangeEventHandler, ReactNode } from 'react'
import { Input } from './ui/input'

function InputWithIcon({
  classNames,
  iconWrapperClasses,
  name,
  type = 'text',
  placeholder,
  direction = 'ltr',
  icon,
  onChange,
  value,
}: {
  classNames?: string
  iconWrapperClasses?: string
  name: string
  type?: string
  placeholder?: string
  direction: string
  icon: ReactNode
  onChange: ChangeEventHandler<HTMLInputElement>
  value?: string
}) {
  return (
    <div className="relative" dir={direction}>
      <div className={cn('absolute top-1/4 ms-2 h-fit w-fit', iconWrapperClasses)}>{icon}</div>
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        dir={direction}
        onChange={onChange}
        value={value}
        className={cn('ps-9', classNames)}
      />
    </div>
  )
}

export default InputWithIcon
