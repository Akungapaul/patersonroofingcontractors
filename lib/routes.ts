// Rule 7 flat paths — single source for every flat URL on the site.
// City:    /roofing-contractor-<city>-nj
// Service: /<service>-paterson-nj  (services are audited against the home city, Paterson)
export function cityPath(citySlug: string): string {
  return `/roofing-contractor-${citySlug}-nj`
}

export function servicePath(serviceSlug: string): string {
  return `/${serviceSlug}-paterson-nj`
}

export function serviceSlugFromFlat(flatSlug: string): string | null {
  if (!flatSlug.endsWith('-paterson-nj')) return null
  return flatSlug.slice(0, -'-paterson-nj'.length)
}

// Combo pages: /<service>-<city>-nj for core services in non-home cities.
// The Paterson column is the service family above (/<service>-paterson-nj),
// so combos only cover the other 15 cities. COMBO_PAIRS is the single source
// for which combos exist: the sample stage lists one pair; the scale stage
// replaces it with the full core matrix (plan: ~/workspace/seo/paterson/combo-plan-2026-10-20.md).
// Core combo services (plan: combo-plan-2026-10-20.md). The matrix is these
// 12 services x every non-home city (15) = 180 combo pages.
export const CORE_COMBO_SERVICES: readonly string[] = [
  'roof-repair',
  're-roofing',
  'roof-leak-repair',
  'emergency-roof-repair',
  'storm-damage-roof-repair',
  'roof-inspection',
  'asphalt-shingle-roofing',
  'flat-roof-installation-repair',
  'metal-roof-installation-repair',
  'gutter-installation-repair',
  'tpo-roofing-installation',
  'commercial-roof-repair',
]

export const COMBO_PAIRS: readonly { service: string; city: string }[] =
  CORE_COMBO_SERVICES.flatMap((service) =>
    [
      'clifton',
      'passaic',
      'wayne',
      'west-milford',
      'hawthorne',
      'little-falls',
      'woodland-park',
      'ringwood',
      'wanaque',
      'pompton-lakes',
      'totowa',
      'north-haledon',
      'haledon',
      'bloomingdale',
      'prospect-park',
    ].map((city) => ({ service, city }))
  )

export function comboPath(serviceSlug: string, citySlug: string): string {
  return `/${serviceSlug}-${citySlug}-nj`
}

export function comboExists(serviceSlug: string, citySlug: string): boolean {
  return COMBO_PAIRS.some((p) => p.service === serviceSlug && p.city === citySlug)
}

export function parseComboSlug(
  flatSlug: string,
  serviceSlugs: readonly string[],
  citySlugs: readonly string[]
): { service: string; city: string } | null {
  // Longest city slug first so multi-word cities (north-haledon) win.
  for (const city of [...citySlugs].sort((a, b) => b.length - a.length)) {
    const suffix = `-${city}-nj`
    if (!flatSlug.endsWith(suffix)) continue
    const service = flatSlug.slice(0, -suffix.length)
    if (serviceSlugs.includes(service) && comboExists(service, city)) {
      return { service, city }
    }
  }
  return null
}

// Rewrite href="/<core-service>-paterson-nj" occurrences inside an HTML
// content block to the same-city combo path, for core services that have a
// combo in that city. Non-core services and the home city keep the Paterson
// service URL. Used when city-scoped content (city intros, combo pages) is
// rendered so in-content service links stay in the reader's city.
export function localizeServiceLinks(htmlText: string, citySlug: string): string {
  if (citySlug === 'paterson') return htmlText
  let out = htmlText
  for (const service of CORE_COMBO_SERVICES) {
    out = out.split(`href="${servicePath(service)}"`).join(`href="${comboPath(service, citySlug)}"`)
  }
  return out
}
