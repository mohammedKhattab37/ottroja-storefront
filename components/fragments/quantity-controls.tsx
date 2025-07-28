import { cn } from '@/lib/utils'
import { Minus, Plus } from 'lucide-react'
import { Button } from '../ui/button'

function QuantityControls({
  quantity,
  maxQuantity,
  addQuantity,
  removeQuantity,
  size = 'big',
  disabled = false,
}: {
  quantity: number
  maxQuantity?: number
  addQuantity: () => void
  removeQuantity: () => void
  size?: 'small' | 'big'
  disabled?: boolean
}) {
  return (
    <div className="border-secondary bg-input flex items-center gap-2 overflow-hidden rounded-full border text-sm font-bold">
      <Button
        variant="vanilla"
        size="icon"
        disabled={quantity == 1 || disabled}
        onClick={removeQuantity}
        className={size == 'big' ? 'size-9' : 'size-8'}
      >
        <Minus className={size == 'big' ? 'size-5' : 'size-3'} />
      </Button>
      <span className={cn('text-center', size == 'big' ? 'w-8' : 'w-3 text-xs')}>{quantity}</span>
      <Button
        variant="vanilla"
        size="icon"
        disabled={(maxQuantity && quantity >= maxQuantity) || disabled}
        onClick={addQuantity}
        className={size == 'big' ? 'size-9' : 'size-8'}
      >
        <Plus className={size == 'big' ? 'size-5' : 'size-3'} />
      </Button>
    </div>
  )
}

export default QuantityControls
