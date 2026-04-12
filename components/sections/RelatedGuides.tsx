import Link from 'next/link'
import { Clock } from 'lucide-react'
import { Card } from '@/components/ui/Card'

interface RelatedGuide {
  title: string
  slug: string
  description: string
  readTime: number
}

interface RelatedGuidesProps {
  guides: readonly RelatedGuide[]
}

export function RelatedGuides({ guides }: RelatedGuidesProps) {
  return (
    <section className="bg-[#F8FAFC] py-section-sm lg:py-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-heading text-[28px] font-bold text-navy md:text-3xl">
          Related Guides
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/roofing-guides/${guide.slug}`}
            >
              <Card interactive className="p-6">
                <h3 className="font-heading text-2xl font-bold text-navy">
                  {guide.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-lg text-gray-700">
                  {guide.description}
                </p>
                <span className="mt-3 flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  {guide.readTime} min read
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
