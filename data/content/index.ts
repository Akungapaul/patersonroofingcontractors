import type { CityContent } from './types'
import { paterson } from './paterson'
import { clifton } from './clifton'
import { passaic } from './passaic'
import { wayne } from './wayne'
import { westMilford } from './west-milford'
import { hawthorne } from './hawthorne'
import { littleFalls } from './little-falls'
import { woodlandPark } from './woodland-park'
import { ringwood } from './ringwood'
import { wanaque } from './wanaque'
import { pomptonLakes } from './pompton-lakes'
import { totowa } from './totowa'
import { northHaledon } from './north-haledon'
import { haledon } from './haledon'
import { bloomingdale } from './bloomingdale'
import { prospectPark } from './prospect-park'

const cityContentMap: Record<string, CityContent> = {
  'paterson': paterson,
  'clifton': clifton,
  'passaic': passaic,
  'wayne': wayne,
  'west-milford': westMilford,
  'hawthorne': hawthorne,
  'little-falls': littleFalls,
  'woodland-park': woodlandPark,
  'ringwood': ringwood,
  'wanaque': wanaque,
  'pompton-lakes': pomptonLakes,
  'totowa': totowa,
  'north-haledon': northHaledon,
  'haledon': haledon,
  'bloomingdale': bloomingdale,
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
