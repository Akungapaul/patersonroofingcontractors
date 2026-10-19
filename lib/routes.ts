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
