export interface Neighborhood {
  readonly name: string
  readonly roofingContext: string // 1-2 sentences about roofing relevance
}

export interface FaqItem {
  readonly question: string
  readonly answer: string // Can contain HTML for rich formatting
}

export interface CityContent {
  readonly slug: string
  readonly name: string
  readonly county: string
  readonly state: string
  readonly cluster: 'Urban' | 'Suburban' | 'Highlands'

  // Hero
  readonly heroHeadline: string
  readonly heroSubheadline: string

  // Content sections
  readonly introHtml: string // 800-1500 words (HTML string with paragraphs)
  readonly localContext: string // Geographic angle paragraph for blockquote callout
  readonly neighborhoods: readonly Neighborhood[]
  readonly relevantServiceSlugs: readonly string[]
  readonly faqItems: readonly FaqItem[]

  // SEO
  readonly seoTitle: string
  readonly seoDescription: string
}
