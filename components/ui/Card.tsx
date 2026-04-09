import { cn } from '@/lib/cn'

interface CardProps extends React.ComponentProps<'div'> {
  interactive?: boolean
}

const baseStyles = 'bg-white shadow-sm rounded-[var(--radius-card)]'

const interactiveStyles =
  'transition-all duration-300 hover:shadow-md hover:border-amber hover:-translate-y-1 border border-transparent cursor-pointer focus-visible:outline-2 focus-visible:outline-amber focus-visible:outline-offset-2 motion-reduce:hover:translate-y-0'

export function Card({
  interactive = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(baseStyles, interactive && interactiveStyles, className)}
      {...props}
    >
      {children}
    </div>
  )
}
