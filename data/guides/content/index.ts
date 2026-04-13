import type { GuideContent } from '../types'
import { completeNjRoofingGuideHomeowners } from './complete-nj-roofing-guide-homeowners'
import { roofRepairVsReplacement } from './roof-repair-vs-replacement'
import { bestRoofingMaterialNjWeather } from './best-roofing-material-nj-weather'
import { roofReplacementCost } from './roof-replacement-cost'
import { signsYouNeedRoofRepairNj } from './signs-you-need-roof-repair-nj'
import { asphaltShinglesVsMetalRoofing } from './asphalt-shingles-vs-metal-roofing'
import { njRoofingLicensingInsuranceGuide } from './nj-roofing-licensing-insurance-guide'
import { bestRoofingForFlatRoofs } from './best-roofing-for-flat-roofs'
import { roofOverlayVsTearOff } from './roof-overlay-vs-tear-off'
import { diyVsProfessionalRoofRepair } from './diy-vs-professional-roof-repair'

const guideContentMap: Record<string, GuideContent> = {
  'complete-nj-roofing-guide-homeowners': completeNjRoofingGuideHomeowners,
  'roof-repair-vs-replacement': roofRepairVsReplacement,
  'best-roofing-material-nj-weather': bestRoofingMaterialNjWeather,
  'roof-replacement-cost': roofReplacementCost,
  'signs-you-need-roof-repair-nj': signsYouNeedRoofRepairNj,
  'asphalt-shingles-vs-metal-roofing': asphaltShinglesVsMetalRoofing,
  'nj-roofing-licensing-insurance-guide': njRoofingLicensingInsuranceGuide,
  'best-roofing-for-flat-roofs': bestRoofingForFlatRoofs,
  'roof-overlay-vs-tear-off': roofOverlayVsTearOff,
  'diy-vs-professional-roof-repair': diyVsProfessionalRoofRepair,
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
