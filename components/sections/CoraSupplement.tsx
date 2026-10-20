import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'
import { services } from '@/data/services'
import { CORE_COMBO_SERVICES, cityPath, comboPath, servicePath } from '@/lib/routes'
import type { CoraSupplementData } from '@/data/cora-supplements'

// Collapsed supplemental block carrying a Cora roadmap implementation:
// report-driven headings, entity/LSI sentences, asked outbound links, and a
// complete site index. Starts collapsed; fully present in the HTML.
export function CoraSupplement({
  data,
  phrase,
}: {
  data: CoraSupplementData
  phrase: string
}) {
  return (
    <section className="bg-white py-section-sm lg:py-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <details className="rounded-lg bg-gray-light p-6">
          <summary className="cursor-pointer font-heading text-xl font-bold text-navy">
            More About {phrase}: Extended Guide, Service Details &amp; Full Area Index
          </summary>

          <div className="mt-6">
            {data.sections.map((section) => (
              <div key={section.h2} className="mb-8">
                <h2 className="mb-4 font-heading text-2xl font-bold text-navy">{section.h2}</h2>
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="mb-4 text-slate">
                    {p}
                  </p>
                ))}
                {section.h3s?.map((h3) => (
                  <h3 key={h3} className="mb-2 mt-5 font-heading text-lg font-bold text-navy">
                    {h3}
                  </h3>
                ))}
              </div>
            ))}

            {data.outboundLinks.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-4 font-heading text-2xl font-bold text-navy">
                  Find {phrase} Providers &amp; Resources
                </h2>
                <ul className="list-disc pl-6 text-slate">
                  {data.outboundLinks.map((l) => (
                    <li key={l.href} className="mb-2">
                      <a href={l.href} className="text-amber hover:text-amber-dark">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mb-8">
              <h2 className="mb-4 font-heading text-2xl font-bold text-navy">
                Complete Roofing Service &amp; Area Index
              </h2>
              <h3 className="mb-2 mt-5 font-heading text-lg font-bold text-navy">
                Roofing Contractor Pages by City
              </h3>
              <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3">
                {siteConfig.municipalities.map((m) => (
                  <li key={m.slug}>
                    <Link href={cityPath(m.slug)} className="text-amber hover:text-amber-dark">
                      Roofing Contractor {m.name}, NJ
                    </Link>
                  </li>
                ))}
              </ul>
              <h3 className="mb-2 mt-5 font-heading text-lg font-bold text-navy">
                All Roofing Services in Paterson, NJ
              </h3>
              <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={servicePath(s.slug)} className="text-amber hover:text-amber-dark">
                      {s.name} Paterson, NJ
                    </Link>
                  </li>
                ))}
              </ul>
              {CORE_COMBO_SERVICES.map((svc) => {
                const entry = services.find((s) => s.slug === svc)
                if (!entry) return null
                return (
                  <div key={svc}>
                    <h3 className="mb-2 mt-5 font-heading text-lg font-bold text-navy">
                      {entry.name} by City
                    </h3>
                    <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3">
                      {siteConfig.municipalities
                        .filter((m) => m.slug !== 'paterson')
                        .map((m) => (
                          <li key={m.slug}>
                            <Link
                              href={comboPath(svc, m.slug)}
                              className="text-amber hover:text-amber-dark"
                            >
                              {entry.name} {m.name}, NJ
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        </details>
      </div>
    </section>
  )
}
