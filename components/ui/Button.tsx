import { cn } from '@/lib/cn'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ComponentProps<'button'> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-amber text-white font-bold hover:bg-amber-dark rounded-[var(--radius-button)]',
  secondary:
    'border-2 border-navy text-navy font-bold hover:bg-amber hover:text-white hover:border-amber rounded-[var(--radius-button)]',
  outline:
    'border border-gray-300 text-gray-700 hover:border-amber hover:text-amber rounded-[var(--radius-button)]',
  ghost: 'text-navy hover:bg-gray-light rounded-[var(--radius-button)]',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-lg',
  lg: 'px-8 py-4 text-lg',
}

const baseStyles =
  'inline-flex items-center justify-center gap-2 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-amber focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]'

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {children}
    </button>
  )
}
