'use client'

import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'

interface TableOfContentsProps {
  sections: readonly { id: string; title: string }[]
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-80px 0px -70% 0px' }
    )

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sections])

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Desktop sidebar TOC */}
      <div className="sticky top-20 hidden w-64 py-4 pr-8 lg:block">
        <p className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500">
          Table of Contents
        </p>
        <nav aria-label="Table of contents">
          <ul>
            {sections.map(({ id, title }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => handleClick(e, id)}
                  className={cn(
                    'block border-l-2 py-1 pl-3 text-lg transition-colors duration-200',
                    activeId === id
                      ? 'border-l-amber font-bold text-amber'
                      : 'border-l-transparent text-gray-600 hover:text-navy'
                  )}
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile collapsible TOC */}
      <div className="lg:hidden">
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-lg bg-[#F8FAFC] p-4"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-toc"
        >
          <span className="text-lg font-bold text-navy">Table of Contents</span>
          <ChevronDown
            className={cn(
              'h-5 w-5 text-amber transition-transform duration-200 motion-reduce:transition-none',
              isOpen && 'rotate-180'
            )}
            aria-hidden="true"
          />
        </button>
        <nav
          id="mobile-toc"
          aria-label="Table of contents"
          className={cn(
            'overflow-hidden transition-all duration-300 motion-reduce:transition-none',
            isOpen ? 'max-h-[1000px] pb-4' : 'max-h-0'
          )}
        >
          <ul className="mt-2 space-y-1 px-4">
            {sections.map(({ id, title }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => {
                    handleClick(e, id)
                    setIsOpen(false)
                  }}
                  className={cn(
                    'block border-l-2 py-1 pl-3 text-lg transition-colors duration-200',
                    activeId === id
                      ? 'border-l-amber font-bold text-amber'
                      : 'border-l-transparent text-gray-600 hover:text-navy'
                  )}
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}
