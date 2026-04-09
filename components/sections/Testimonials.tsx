import { testimonials } from '@/data/testimonials'
import { Card } from '@/components/ui/Card'
import { StarRating } from '@/components/ui/StarRating'
import { Quote } from 'lucide-react'

export function Testimonials() {
  return (
    <section className="bg-gray-light py-section-sm lg:py-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center font-heading text-[28px] font-bold text-navy md:text-3xl">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card
              key={t.name}
              className="border-t-[3px] border-t-amber border-l-[3px] border-l-amber p-6"
            >
              <Quote
                className="mb-3 h-8 w-8 text-amber/30"
                aria-hidden="true"
              />
              <p className="mb-4 text-lg leading-relaxed text-gray-700">
                &ldquo;{t.text}&rdquo;
              </p>
              <StarRating rating={t.rating} className="mb-2" />
              <p className="font-bold text-navy">{t.name}</p>
              <p className="text-sm text-gray-500">{t.city}, NJ</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
