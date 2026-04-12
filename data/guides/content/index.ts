import type { GuideContent } from '../types'

// Guide content imports will be added as guide content files are created in Plan 10
const guideContentMap: Record<string, GuideContent> = {
  // Pattern: 'slug': importedContent,
}

export function getGuideContent(slug: string): GuideContent | undefined {
  return guideContentMap[slug]
}

export function getAllGuideContent(): GuideContent[] {
  return Object.values(guideContentMap)
}

export function getAllGuideSlugs(): string[] {
  return Object.keys(guideContentMap)
}
