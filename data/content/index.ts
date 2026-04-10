import type { CityContent } from './types'
import { paterson } from './paterson'

const cityContentMap: Record<string, CityContent> = {
  'paterson': paterson,
  // Remaining 15 cities will be added in Plans 04 and 05
}

export function getCityContent(slug: string): CityContent | undefined {
  return cityContentMap[slug]
}

export function getAllCityContent(): CityContent[] {
  return Object.values(cityContentMap)
}

export function getAllCitySlugs(): string[] {
  return Object.keys(cityContentMap)
}
