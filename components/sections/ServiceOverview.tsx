interface ServiceOverviewProps {
  overviewHtml: string
  serviceName: string
}

export function ServiceOverview({ overviewHtml, serviceName }: ServiceOverviewProps) {
  return (
    <section className="bg-white py-section-sm lg:py-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center font-heading text-[28px] font-bold text-navy md:text-3xl">
          {serviceName}
        </h2>

        <div className="mx-auto max-w-4xl">
          <div
            className="text-lg leading-relaxed text-gray-700 [&>p>a]:text-amber-dark [&>p>a]:underline hover:[&>p>a]:text-amber [&>p]:mb-4 [&>a]:text-amber-dark [&>a]:underline hover:[&>a]:text-amber"
            dangerouslySetInnerHTML={{ __html: overviewHtml }}
          />
        </div>
      </div>
    </section>
  )
}
