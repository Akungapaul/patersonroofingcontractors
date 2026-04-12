'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { services } from '@/data/services'
import { cn } from '@/lib/cn'

interface MegaMenuProps {
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

const MAX_SERVICES_PER_CATEGORY = 5

function getServicesByCategory() {
  const grouped: Record<string, typeof services[number][]> = {}
  services.forEach((s) => {
    const cat = s.category ?? 'Other'
    if (!grouped[cat]) grouped[cat] = []
    grouped[cat].push(s)
  })
  return grouped
}

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const servicesByCategory = getServicesByCategory()

  return (
    <div
      className={cn(
        'absolute left-0 top-full z-50 mt-1 w-full max-w-5xl rounded-lg bg-white p-6 shadow-xl transition-opacity duration-200 motion-reduce:transition-none',
        isOpen ? 'opacity-100' : 'opacity-0'
      )}
      role="menu"
    >
      <div className="grid grid-cols-3 gap-6 lg:grid-cols-4">
        {CATEGORY_ORDER.map((category) => {
          const categoryServices = servicesByCategory[category]
          if (!categoryServices || categoryServices.length === 0) return null

          return (
            <div key={category}>
              <h3 className="mb-2 border-b-2 border-b-amber pb-2 text-sm font-bold uppercase tracking-wider text-gray-500">
                {category}
              </h3>
              <ul>
                {categoryServices
                  .slice(0, MAX_SERVICES_PER_CATEGORY)
                  .map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="block py-1 text-lg text-navy transition-colors hover:text-amber"
                        role="menuitem"
                        onClick={onClose}
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                {categoryServices.length > MAX_SERVICES_PER_CATEGORY && (
                  <li>
                    <Link
                      href="/services"
                      className="block py-1 text-sm font-semibold text-gray-400 transition-colors hover:text-amber"
                      role="menuitem"
                      onClick={onClose}
                    >
                      +{categoryServices.length - MAX_SERVICES_PER_CATEGORY}{' '}
                      more
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )
        })}
      </div>
      <div className="mt-4 border-t border-gray-200 pt-4">
        <Link
          href="/services"
          className="font-bold text-amber transition-colors hover:text-amber-dark"
          role="menuitem"
          onClick={onClose}
        >
          View All Services
        </Link>
      </div>
    </div>
  )
}
