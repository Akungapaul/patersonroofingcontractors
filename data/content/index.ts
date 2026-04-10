import type { CityContent } from './types'
import { paterson } from './paterson'
import { clifton } from './clifton'
import { passaic } from './passaic'
import { wayne } from './wayne'
import { hawthorne } from './hawthorne'
import { littleFalls } from './little-falls'
import { woodlandPark } from './woodland-park'
import { haledon } from './haledon'
import { prospectPark } from './prospect-park'

const cityContentMap: Record<string, CityContent> = {
  'paterson': paterson,
  'clifton': clifton,
  'passaic': passaic,
  'wayne': wayne,
  'hawthorne': hawthorne,
  'little-falls': littleFalls,
  'woodland-park': woodlandPark,
  'haledon': haledon,
  'prospect-park': prospectPark,
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
