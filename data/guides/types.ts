import type { FaqItem } from '@/data/content/types'

export interface GuideSection {
  readonly id: string
  readonly title: string
  readonly contentHtml: string
  readonly subsections?: readonly {
    readonly id: string
    readonly title: string
    readonly contentHtml: string
  }[]
}

export interface GuideContent {
  readonly slug: string
  readonly title: string
  readonly description: string
  readonly sections: readonly GuideSection[]
  readonly expertTips: readonly string[]
  readonly faqItems: readonly FaqItem[]
  readonly relatedServiceSlugs: readonly string[]
  readonly relatedGuideSlugs: readonly string[]
  readonly seoTitle: string
  readonly seoDescription: string
}
