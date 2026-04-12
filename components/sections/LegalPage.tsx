interface LegalPageProps {
  title: string
  content: string
  lastUpdated?: string
}

export function LegalPage({ title, content, lastUpdated }: LegalPageProps) {
  return (
    <section className="bg-white py-section-sm lg:py-section">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-center font-heading text-4xl font-bold text-navy md:text-5xl">
          {title}
        </h1>

        {lastUpdated && (
          <p className="mb-12 text-center text-sm text-gray-500">
            Last updated: {lastUpdated}
          </p>
        )}

        <div
          className="text-lg leading-relaxed text-gray-700 [&>h2]:mb-4 [&>h2]:mt-12 [&>h2]:font-heading [&>h2]:text-[28px] [&>h2]:font-bold [&>h2]:text-navy [&>h2]:md:text-3xl [&>p]:mb-4 [&>ul]:mb-4 [&>ul]:list-disc [&>ul]:pl-6"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  )
}
