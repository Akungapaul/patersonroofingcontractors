'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { navigationItems } from '@/lib/navigation'
import { siteConfig } from '@/lib/site-config'
import { cn } from '@/lib/cn'

interface NavigationProps {
  className?: string
}

export function Navigation({ className }: NavigationProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)

  const closeMenu = useCallback(() => {
    setOpenMenu(null)
  }, [])

  // Close on Escape key or click outside
  useEffect(() => {
    if (!openMenu) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeMenu()
      }
    }

    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        closeMenu()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [openMenu, closeMenu])

  return (
    <nav
      ref={navRef}
      className={cn('items-center gap-1', className)}
      aria-label="Main navigation"
    >
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
          const isOpen = openMenu === item.label

          if (hasChildren) {
            return (
              <li key={item.label} className="relative">
                <button
                  onClick={() =>
                    setOpenMenu(isOpen ? null : item.label)
                  }
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  className="inline-flex min-h-[44px] items-center gap-1 px-3 py-2 font-semibold text-white transition-colors hover:text-amber-light"
                >
                  {item.label}
                  <svg
                    className={cn(
                      'h-4 w-4 transition-transform',
                      isOpen && 'rotate-180'
                    )}
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
                </button>
                {isOpen && (
                  <div
                    className="absolute left-0 top-full z-50 mt-1 w-[280px] rounded-lg bg-white py-2 shadow-lg"
                    role="menu"
                  >
                    {children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-lg text-navy transition-colors hover:bg-amber-light/10"
                        role="menuitem"
                        onClick={closeMenu}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
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
