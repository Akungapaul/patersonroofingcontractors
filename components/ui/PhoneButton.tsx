import { Phone } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { cn } from '@/lib/cn'

interface PhoneButtonProps {
  compact?: boolean
  className?: string
}

export function PhoneButton({ compact = false, className }: PhoneButtonProps) {
  return (
    <a
      href={`tel:${siteConfig.phoneRaw}`}
      className={cn(
        'inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-amber px-4 py-2 font-bold text-white transition-colors hover:bg-amber-dark active:scale-[0.97] min-h-[44px]',
        className
      )}
    >
      <Phone className="h-5 w-5" aria-hidden="true" />
      {compact ? (
        <>
          <span className="sm:hidden">Call</span>
          <span className="hidden sm:inline">{siteConfig.phone}</span>
          <span className="sr-only">Call {siteConfig.phone}</span>
        </>
      ) : (
        <span>{siteConfig.phone}</span>
      )}
    </a>
  )
}
