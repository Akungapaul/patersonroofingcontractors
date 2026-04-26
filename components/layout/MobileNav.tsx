'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { X, ChevronDown } from 'lucide-react'
import { navigationItems } from '@/lib/navigation'
import { siteConfig } from '@/lib/site-config'
import { services } from '@/data/services'
import { PhoneButton } from '@/components/ui/PhoneButton'
import { cn } from '@/lib/cn'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

const CATEGORY_ORDER = [
  'Repair & Maintenance',
  'Residential Roofing',
  'Commercial Roofing',
  'Roof Replacement',
  'Components & Specialty',
  'Gutters & Drainage',
  'Energy & Solar',
  'Design & Specialty',
] as const

function getServicesByCategory() {
  const grouped: Record<string, typeof services[number][]> = {}
  services.forEach((s) => {
    const cat = s.category ?? 'Other'
    if (!grouped[cat]) grouped[cat] = []
    grouped[cat].push(s)
  })
  return grouped
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])

  const toggleExpanded = useCallback((label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    )
  }, [])

  const toggleCategory = useCallback((category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }, [])

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 transition-opacity duration-300',
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide panel */}
      <div
        className={cn(
          'fixed right-0 top-0 z-50 flex h-full w-[300px] max-w-[85vw] flex-col bg-navy transition-transform duration-300 motion-reduce:transition-none',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-navy-light p-4">
          <span className="font-heading text-xl text-white">Menu</span>
          <button
            onClick={onClose}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[var(--radius-button)] text-white transition-colors hover:bg-navy-light focus-visible:outline-2 focus-visible:outline-amber focus-visible:outline-offset-2"
            aria-label="Close navigation menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 overflow-y-auto" aria-label="Mobile navigation">
          <ul>
            {navigationItems.map((item) => {
              const isLocations = item.label === 'Locations'
              const isServices = item.label === 'Services'
              const isExpanded = expandedItems.includes(item.label)

              // Services uses category-grouped accordion
              if (isServices) {
                const servicesByCategory = getServicesByCategory()
                return (
                  <li key={item.label}>
                    <button
                      onClick={() => toggleExpanded(item.label)}
                      className="flex min-h-[44px] w-full items-center justify-between border-b border-navy-light px-4 py-3 text-lg text-white transition-colors hover:bg-navy-light"
                      aria-expanded={isExpanded}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          'h-5 w-5 transition-transform duration-200 motion-reduce:transition-none',
                          isExpanded && 'rotate-180'
                        )}
                        aria-hidden="true"
                      />
                    </button>
                    <div
                      className={cn(
                        'overflow-hidden transition-all duration-200 motion-reduce:transition-none',
                        isExpanded ? 'max-h-[5000px]' : 'max-h-0'
                      )}
                    >
                      {CATEGORY_ORDER.map((category) => {
                        const categoryServices = servicesByCategory[category]
                        if (!categoryServices || categoryServices.length === 0)
                          return null
                        const isCatExpanded =
                          expandedCategories.includes(category)
                        return (
                          <div key={category}>
                            <button
                              onClick={() => toggleCategory(category)}
                              className="flex min-h-[44px] w-full items-center justify-between py-3 pl-6 pr-4 text-lg font-bold text-white transition-colors hover:bg-navy-light"
                              aria-expanded={isCatExpanded}
                            >
                              {category}
                              <ChevronDown
                                className={cn(
                                  'h-4 w-4 transition-transform duration-200 motion-reduce:transition-none',
                                  isCatExpanded && 'rotate-180'
                                )}
                                aria-hidden="true"
                              />
                            </button>
                            <ul
                              className={cn(
                                'overflow-hidden transition-all duration-200 motion-reduce:transition-none',
                                isCatExpanded ? 'max-h-[2000px]' : 'max-h-0'
                              )}
                            >
                              {categoryServices.map((service) => (
                                <li key={service.slug}>
                                  <Link
                                    href={`/services/${service.slug}`}
                                    onClick={onClose}
                                    className="block py-2 pl-10 pr-4 text-lg text-gray-300 transition-colors hover:text-amber-light"
                                  >
                                    {service.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      })}
                      <Link
                        href="/services"
                        onClick={onClose}
                        className="block py-3 pl-6 pr-4 text-lg font-bold text-amber transition-colors hover:text-amber-light"
                      >
                        View All Services
                      </Link>
                    </div>
                  </li>
                )
              }

              // Locations uses standard flat dropdown
              const children = isLocations
                ? siteConfig.municipalities.map((m) => ({
                    label: m.name,
                    href: `/roofing-contractor-${m.slug}-nj`,
                  }))
                : item.children

              const hasChildren = children && children.length > 0

              if (hasChildren) {
                return (
                  <li key={item.label}>
                    <button
                      onClick={() => toggleExpanded(item.label)}
                      className="flex min-h-[44px] w-full items-center justify-between border-b border-navy-light px-4 py-3 text-lg text-white transition-colors hover:bg-navy-light"
                      aria-expanded={isExpanded}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          'h-5 w-5 transition-transform duration-200 motion-reduce:transition-none',
                          isExpanded && 'rotate-180'
                        )}
                        aria-hidden="true"
                      />
                    </button>
                    <ul
                      className={cn(
                        'overflow-hidden transition-all duration-200 motion-reduce:transition-none',
                        isExpanded ? 'max-h-[2000px]' : 'max-h-0'
                      )}
                    >
                      {children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={onClose}
                            className="block min-h-[44px] border-b border-navy-light/50 py-3 pl-8 pr-4 text-lg text-gray-300 transition-colors hover:bg-navy-light hover:text-white"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                )
              }

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block min-h-[44px] border-b border-navy-light px-4 py-3 text-lg text-white transition-colors hover:bg-navy-light"
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Bottom phone CTA */}
        <div className="border-t border-navy-light p-4">
          <PhoneButton compact={false} className="w-full justify-center" />
        </div>
      </div>
    </>
  )
}
