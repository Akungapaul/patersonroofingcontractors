'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Navigation } from '@/components/layout/Navigation'
import { MobileNav } from '@/components/layout/MobileNav'
import { PhoneButton } from '@/components/ui/PhoneButton'
import { siteConfig } from '@/lib/site-config'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {/* Skip to main content link -- first focusable element on the page */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-[var(--radius-button)] focus:bg-amber focus:px-4 focus:py-2 focus:font-bold focus:text-white"
      >
        Skip to main content
      </a>

      {/* Sticky header with amber border-bottom (Variation 9) */}
      <header className="sticky top-0 z-50 border-b-[3px] border-amber bg-navy backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo (left) */}
            <Link
              href="/"
              className="flex items-center focus-visible:outline-2 focus-visible:outline-amber focus-visible:outline-offset-2"
            >
              <span className="font-heading text-xl font-bold text-white">
                {siteConfig.businessName}
              </span>
            </Link>

            {/* Desktop Navigation (center) */}
            <Navigation className="hidden md:flex" />

            {/* Desktop Phone CTA (right) */}
            <PhoneButton compact={false} className="hidden md:inline-flex" />

            {/* Mobile: Phone + Hamburger */}
            <div className="flex items-center gap-2 md:hidden">
              <PhoneButton compact={true} />
              <button
                onClick={() => setIsMenuOpen(true)}
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[var(--radius-button)] text-white transition-colors hover:bg-navy-light focus-visible:outline-2 focus-visible:outline-amber focus-visible:outline-offset-2"
                aria-label="Open navigation menu"
                aria-expanded={isMenuOpen}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile navigation overlay */}
      <MobileNav isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
