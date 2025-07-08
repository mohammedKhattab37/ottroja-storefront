import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import React, { ReactNode } from 'react'
import { Button } from './ui/button'

interface CustomDrawerProps {
  children: React.ReactNode
  isDrawerOpen: boolean
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
  contentDirection: 'rtl' | 'ltr'
  title: string | ReactNode
  showInBigScreens?: boolean
}

function CustomDrawer({
  children,
  isDrawerOpen,
  setIsDrawerOpen,
  contentDirection,
  title,
  showInBigScreens = false,
}: CustomDrawerProps) {
  if (!isDrawerOpen) return null

  return (
    <div
      className={cn(
        'text-card-foreground fixed inset-0 z-50 bg-black/30',
        showInBigScreens ? '' : 'lg:hidden',
      )}
      onClick={() => setIsDrawerOpen(false)}
    >
      <div
        className={`bg-background fixed top-0 bottom-0 z-60 w-96 max-w-[85vw] transform shadow-xl ${
          contentDirection === 'rtl' ? 'right-0 translate-x-0' : 'left-0 translate-x-0'
        }`}
        onClick={(e) => e.stopPropagation()}
        dir={contentDirection}
      >
        <div className="flex items-center justify-between p-5">
          <h2 className="text-lg font-semibold">{title}</h2>
          <Button onClick={() => setIsDrawerOpen(false)} variant={'vanilla'} size={'icon'}>
            <ChevronRight
              className={cn(
                'text-secondary size-8',
                contentDirection == 'ltr' ? 'scale-x-[-1]' : '',
              )}
            />
          </Button>
        </div>
        <div className="h-full overflow-y-auto pb-20">{children}</div>
      </div>
    </div>
  )
}

export default CustomDrawer
