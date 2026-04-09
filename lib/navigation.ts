export type NavigationItem = {
  readonly label: string
  readonly href: string
  readonly children?: readonly { readonly label: string; readonly href: string }[]
}

export const navigationItems: readonly NavigationItem[] = [
  {
    label: 'Services',
    href: '/services',
    children: [], // Populated from data/services at render time
  },
  {
    label: 'Locations',
    href: '/locations',
    children: [], // Populated from siteConfig.municipalities at render time
  },
  { label: 'Guides', href: '/roofing-guides' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const
