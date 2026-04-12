import type { GuideSection } from '@/data/guides/types'

interface GuideArticleProps {
  sections: readonly GuideSection[]
}

export function GuideArticle({ sections }: GuideArticleProps) {
  return (
    <section className="bg-white py-section-sm lg:py-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <article className="max-w-4xl">
          {sections.map((section, index) => (
            <div key={section.id} className="mb-12">
              <h2
                id={section.id}
                className={`font-heading text-[28px] font-bold text-navy md:text-3xl ${index === 0 ? 'mt-0' : 'mt-12'} mb-6`}
              >
                {section.title}
              </h2>
              <div
                className="text-lg leading-relaxed text-gray-700 [&>ol]:mb-4 [&>ol]:list-decimal [&>ol]:pl-6 [&>p>a]:text-amber-dark [&>p>a]:underline hover:[&>p>a]:text-amber [&>p]:mb-4 [&>ul]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>a]:text-amber-dark [&>a]:underline hover:[&>a]:text-amber"
                dangerouslySetInnerHTML={{ __html: section.contentHtml }}
              />

              {section.subsections?.map((sub) => (
                <div key={sub.id} className="mt-8">
                  <h3
                    id={sub.id}
                    className="mb-4 font-heading text-2xl font-bold text-navy"
                  >
                    {sub.title}
                  </h3>
                  <div
                    className="text-lg leading-relaxed text-gray-700 [&>ol]:mb-4 [&>ol]:list-decimal [&>ol]:pl-6 [&>p>a]:text-amber-dark [&>p>a]:underline hover:[&>p>a]:text-amber [&>p]:mb-4 [&>ul]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>a]:text-amber-dark [&>a]:underline hover:[&>a]:text-amber"
                    dangerouslySetInnerHTML={{ __html: sub.contentHtml }}
                  />
                </div>
              ))}
            </div>
          ))}
        </article>
      </div>
    </section>
  )
}
