import type { ServiceContent } from '../types'

// Content imports will be added as service content files are created in Plans 07-09
// For now, start with an empty map that will be populated

const serviceContentMap: Record<string, ServiceContent> = {
  // Service content files will be imported and added here
  // Pattern: 'slug': importedContent,
}

export function getServiceContent(slug: string): ServiceContent | undefined {
  return serviceContentMap[slug]
}

export function getAllServiceContent(): ServiceContent[] {
  return Object.values(serviceContentMap)
}

export function getAllServiceSlugs(): string[] {
  return Object.keys(serviceContentMap)
}

export function getServicesByCategory(): Record<string, ServiceContent[]> {
  const grouped: Record<string, ServiceContent[]> = {}
  for (const service of Object.values(serviceContentMap)) {
    if (!grouped[service.category]) {
      grouped[service.category] = []
    }
    grouped[service.category].push(service)
  }
  return grouped
}
