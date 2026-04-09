import Link from 'next/link'
import { navigationItems } from '@/lib/navigation'
import { siteConfig } from '@/lib/site-config'
import { cn } from '@/lib/cn'

interface NavigationProps {
  className?: string
}

export function Navigation({ className }: NavigationProps) {
  return (
    <nav className={cn('items-center gap-1', className)} aria-label="Main navigation">
      <ul className="flex items-center gap-1">
        {navigationItems.map((item) => {
          const isLocations = item.label === 'Locations'
          const children = isLocations
            ? siteConfig.municipalities.map((m) => ({
                label: m.name,
                href: `/roofing-contractor-${m.slug}-nj`,
              }))
            : item.children

          const hasChildren = children && children.length > 0

          if (hasChildren) {
            return (
              <li key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className="inline-flex min-h-[44px] items-center gap-1 px-3 py-2 font-semibold text-white transition-colors hover:text-amber-light"
                >
                  {item.label}
                  <svg
                    className="h-4 w-4 transition-transform group-hover:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Link>
                <div
                  className="invisible absolute left-0 top-full z-50 mt-1 w-[280px] rounded-lg bg-white py-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100"
                  role="menu"
                >
                  {children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-2 text-lg text-navy transition-colors hover:bg-amber-light/10"
                      role="menuitem"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </li>
            )
          }

          return (
            <li key={item.label}>
              <Link
                href={item.href}
                className="inline-flex min-h-[44px] items-center px-3 py-2 font-semibold text-white transition-colors hover:text-amber-light"
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
