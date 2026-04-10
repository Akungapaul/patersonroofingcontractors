interface CityIntroProps {
  cityName: string
  introHtml: string
  localContext: string
}

export function CityIntro({ cityName, introHtml, localContext }: CityIntroProps) {
  return (
    <section className="bg-white py-section-sm lg:py-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center font-heading text-[28px] font-bold text-navy md:text-3xl">
          About Roofing in {cityName}
        </h2>

        <div className="mx-auto max-w-4xl">
          <div
            className="text-lg leading-relaxed text-gray-700 [&>p]:mb-4"
            dangerouslySetInnerHTML={{ __html: introHtml }}
          />

          <blockquote className="mt-8 border-l-4 border-l-amber bg-gray-light/50 py-4 pl-6 text-lg italic text-gray-700">
            {localContext}
          </blockquote>
        </div>
      </div>
    </section>
  )
}
