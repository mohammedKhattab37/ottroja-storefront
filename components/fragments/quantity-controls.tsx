import { cn } from '@/lib/utils'
import { Minus, Plus } from 'lucide-react'
import { Button } from '../ui/button'

function QuantityControls({
  quantity,
  setQuantity,
  size = 'big',
}: {
  quantity: number
  setQuantity: React.Dispatch<React.SetStateAction<number>>
  size?: 'small' | 'big'
}) {
  const updateQuantity = (change: number) => {
    if (quantity + change < 1) {
      return
    }
    setQuantity((oldValue) => oldValue + change)
  }

  return (
    <div className="border-secondary bg-input flex items-center gap-2 overflow-hidden rounded-full border text-sm font-bold">
      <Button
        variant="vanilla"
        size="icon"
        disabled={quantity == 1}
        onClick={() => updateQuantity(-1)}
        className={size == 'big' ? 'size-5' : 'size-8'}
      >
        <Minus className={size == 'big' ? 'size-5' : 'size-3'} />
      </Button>
      <span className={cn('text-center', size == 'big' ? 'w-8' : 'w-3 text-xs')}>{quantity}</span>
      <Button
        variant="vanilla"
        size="icon"
        onClick={() => updateQuantity(1)}
        className={size == 'big' ? 'size-9' : 'size-8'}
      >
        <Plus className={size == 'big' ? 'size-5' : 'size-3'} />
      </Button>
    </div>
  )
}

export default QuantityControls
