'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'
import type { FaqItem } from '@/data/content/types'

interface CityFAQProps {
  faqItems: readonly FaqItem[]
  cityName: string
}

export function CityFAQ({ faqItems, cityName }: CityFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) =>
    setOpenIndex(openIndex === index ? null : index)

  return (
    <section className="bg-white py-section-sm lg:py-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center font-heading text-[28px] font-bold text-navy md:text-3xl">
          Frequently Asked Questions About Roofing in {cityName}
        </h2>

        <div className="mx-auto max-w-3xl">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={cn(
                'border-b border-gray-200',
                index === 0 && 'border-t border-gray-200'
              )}
            >
              <button
                id={`faq-question-${index}`}
                type="button"
                className="flex w-full items-center justify-between py-5 text-left hover:bg-gray-50"
                onClick={() => toggle(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="pr-4 font-heading text-2xl font-bold text-navy">
                  {item.question}
                </span>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 shrink-0 text-amber transition-transform duration-200 motion-reduce:transition-none',
                    openIndex === index && 'rotate-180'
                  )}
                  aria-hidden="true"
                />
              </button>
              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                className={cn(
                  'overflow-hidden transition-all duration-300 motion-reduce:transition-none',
                  openIndex === index ? 'max-h-[1000px] pb-5' : 'max-h-0'
                )}
                aria-hidden={openIndex !== index}
              >
                <div
                  className="text-lg leading-relaxed text-gray-700"
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
