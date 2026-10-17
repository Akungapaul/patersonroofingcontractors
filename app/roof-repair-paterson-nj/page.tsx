import type { Metadata } from 'next'
import { getServiceContent } from '@/data/services/content'
import { serviceMetadata } from '@/lib/seo-metadata'
import ServicePage from '../services/[serviceSlug]/page'

// Rule 7 flat sample wrapper: serves the Roof Repair service content at
// /roof-repair-paterson-nj. Scale-up replaces this one-off wrapper with a
// shared flat template that generates canonical/schema from the flat path.
export async function generateMetadata(): Promise<Metadata> {
  const content = getServiceContent('roof-repair')
  if (!content) return {}
  const metadata = serviceMetadata(content)
  return {
    ...metadata,
    alternates: { ...metadata.alternates, canonical: '/roof-repair-paterson-nj' },
  }
}

export default async function RoofRepairPatersonPage() {
  return ServicePage({
    params: Promise.resolve({ serviceSlug: 'roof-repair' }),
  })
}
