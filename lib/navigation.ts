export type NavigationItem = {
  readonly label: string
  readonly href: string
  readonly children?: readonly { readonly label: string; readonly href: string }[]
}

export const navigationItems: readonly NavigationItem[] = [
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Roof Repair', href: '/services/roof-repair' },
      { label: 'Roof Replacement', href: '/services/roof-replacement' },
      { label: 'Roof Inspection', href: '/services/roof-inspection' },
      { label: 'Storm Damage Repair', href: '/services/storm-damage-repair' },
      { label: 'Flat Roof Services', href: '/services/flat-roof-services' },
      { label: 'Gutter Installation', href: '/services/gutter-installation' },
      { label: 'Emergency Roofing', href: '/services/emergency-roofing' },
      { label: 'Commercial Roofing', href: '/services/commercial-roofing' },
    ],
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
