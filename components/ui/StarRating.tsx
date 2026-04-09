import { Star } from 'lucide-react'
import { cn } from '@/lib/cn'

interface StarRatingProps {
  rating: number
  className?: string
}

export function StarRating({ rating, className }: StarRatingProps) {
  return (
    <div
      role="img"
      aria-label={`${rating} out of 5 stars`}
      className={cn('flex items-center gap-0.5', className)}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={cn(
            'h-5 w-5',
            i < rating
              ? 'fill-amber-light text-amber-light'
              : 'fill-gray-300 text-gray-300'
          )}
        />
      ))}
    </div>
  )
}
