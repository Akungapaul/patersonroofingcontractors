import Link from "next/link";

export function SeoContent() {
  return (
    <section className="bg-white py-section-sm lg:py-section">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-6 font-heading text-[28px] font-bold text-navy md:text-3xl">
          Why Passaic County Homeowners Choose Paterson Roofing
        </h2>
        <div className="space-y-4 text-lg leading-relaxed text-gray-700">
          <p>
            Passaic County homeowners face unique roofing challenges that demand
            experienced, local contractors who understand the region. From
            powerful nor&apos;easters and heavy snowfall to summer thunderstorms
            and ice dam buildup during harsh New Jersey winters, your roof takes
            a beating year-round. That&apos;s why families across all 16
            municipalities trust Paterson Roofing Contractors to keep their
            homes protected.
          </p>
          <p>
            Our team has over 15 years of experience working on every type of
            roofing system found in Passaic County &mdash; from the historic
            multi-family flat roofs in Paterson and Clifton to the steep-pitched
            colonial roofs throughout Wayne, Hawthorne, and Totowa, to the
            weather-exposed homes in the New Jersey Highlands communities of
            West Milford, Ringwood, and Bloomingdale. We understand how local
            building codes, neighborhood housing styles, and regional weather
            patterns affect your roof&apos;s performance and longevity.
          </p>
          <p>
            Whether you need a complete roof replacement, emergency storm damage
            repair, a thorough roof inspection before buying a home, or
            preventive maintenance to extend your roof&apos;s lifespan, we
            deliver quality craftsmanship at fair prices. Every project includes
            a detailed written estimate, premium materials from trusted
            manufacturers, and a workmanship warranty that gives you peace of
            mind. As a licensed and insured local roofing company, we stake our
            reputation on every job &mdash; because in Passaic County, your
            neighbors are our neighbors.
          </p>
          <p>
            In Paterson specifically, the most common roofing calls involve roof
            leaks after heavy rain, asphalt shingle repair on older homes, flat
            roof problems on multi-family and mixed-use buildings, storm damage,
            and replacement decisions for roofs that have been patched too many
            times. Our Paterson roofing estimates look at the full roof system
            &mdash; shingles or membrane, flashing, gutters, ventilation,
            decking, and drainage &mdash; so homeowners and property owners know
            whether a targeted repair, roof overlay, EPDM rubber roof repair, or
            full re-roofing project is the right next step.
          </p>
          <div className="rounded-xl border border-gray-200 bg-gray-light p-6">
            <h3 className="mb-3 font-heading text-xl font-bold text-navy">
              Most requested Paterson roofing services
            </h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              <li>
                <Link
                  className="font-semibold text-red hover:underline"
                  href="/services/roof-repair"
                >
                  Roof repair in Paterson
                </Link>
              </li>
              <li>
                <Link
                  className="font-semibold text-red hover:underline"
                  href="/services/emergency-roof-repair"
                >
                  Emergency roof repair
                </Link>
              </li>
              <li>
                <Link
                  className="font-semibold text-red hover:underline"
                  href="/services/re-roofing"
                >
                  Roof replacement and re-roofing
                </Link>
              </li>
              <li>
                <Link
                  className="font-semibold text-red hover:underline"
                  href="/services/rubber-roofing-epdm"
                >
                  Rubber and EPDM flat roofing
                </Link>
              </li>
              <li>
                <Link
                  className="font-semibold text-red hover:underline"
                  href="/services/roof-overlay-installation"
                >
                  Roof overlay installation
                </Link>
              </li>
              <li>
                <Link
                  className="font-semibold text-red hover:underline"
                  href="/services/historic-roof-restoration"
                >
                  Historic roof restoration
                </Link>
              </li>
              <li>
                <Link
                  className="font-semibold text-red hover:underline"
                  href="/roofing-contractor-paterson-nj"
                >
                  Roofing contractor in Paterson, NJ
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
