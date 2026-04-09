import { cn } from '@/lib/cn'

type BadgeVariant = 'trust' | 'cluster'

interface BadgeProps {
  variant: BadgeVariant
  className?: string
  children: React.ReactNode
}

const variantStyles: Record<BadgeVariant, string> = {
  trust: 'inline-flex items-center gap-2 text-navy font-semibold',
  cluster:
    'inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium',
}

export function Badge({ variant, className, children }: BadgeProps) {
  return (
    <span className={cn(variantStyles[variant], className)}>{children}</span>
  )
}
