export type Service = {
  readonly name: string
  readonly slug: string
  readonly description: string
  readonly icon: string
}

export const services: readonly Service[] = [
  {
    name: 'Roof Repair',
    slug: 'roof-repair',
    description:
      'Fast, reliable roof leak repair for residential and commercial properties. We fix storm damage, missing shingles, and worn flashing.',
    icon: 'Wrench',
  },
  {
    name: 'Roof Replacement',
    slug: 'roof-replacement',
    description:
      'Complete tear-off and replacement with premium materials. Architectural shingles, flat roofing, and metal roof options available.',
    icon: 'Home',
  },
  {
    name: 'Roof Inspection',
    slug: 'roof-inspection',
    description:
      'Thorough 21-point roof inspections for homebuyers, insurance claims, and preventive maintenance. Detailed written reports included.',
    icon: 'Search',
  },
  {
    name: 'Storm Damage Repair',
    slug: 'storm-damage-repair',
    description:
      'Emergency storm damage assessment and repair. We work directly with your insurance company to streamline the claims process.',
    icon: 'CloudRain',
  },
  {
    name: 'Flat Roof Services',
    slug: 'flat-roof-services',
    description:
      'Expert flat roof installation, repair, and maintenance. TPO, EPDM, and modified bitumen systems for commercial and residential buildings.',
    icon: 'Building2',
  },
  {
    name: 'Gutter Installation',
    slug: 'gutter-installation',
    description:
      'Seamless gutter installation and repair to protect your foundation. Custom-fit aluminum and copper gutters with leaf guard options.',
    icon: 'Droplets',
  },
  {
    name: 'Emergency Roofing',
    slug: 'emergency-roofing',
    description:
      '24/7 emergency roof tarping and repair. Immediate response to prevent further water damage to your home or business.',
    icon: 'AlertTriangle',
  },
  {
    name: 'Commercial Roofing',
    slug: 'commercial-roofing',
    description:
      'Full-service commercial roofing for office buildings, warehouses, and retail spaces. Preventive maintenance programs available.',
    icon: 'Factory',
  },
  {
    name: 'Asphalt Shingle Roofing',
    slug: 'asphalt-shingle-roofing',
    description:
      'Architectural and 3-tab asphalt shingle installation with industry-leading warranties. The most popular roofing choice for Passaic County homes.',
    icon: 'LayoutGrid',
  },
  {
    name: 'Metal Roof Installation',
    slug: 'metal-roof-installation',
    description:
      'Standing seam and metal shingle roofing built to last 50+ years. Energy-efficient, fire-resistant, and available in a range of finishes.',
    icon: 'Shield',
  },
  {
    name: 'Slate Roof Installation',
    slug: 'slate-roof-installation',
    description:
      'Natural and synthetic slate roofing for historic and premium homes. Expert installation and restoration preserving classic Passaic County architecture.',
    icon: 'Gem',
  },
  {
    name: 'Tile Roof Installation',
    slug: 'tile-roof-installation',
    description:
      'Clay and concrete tile roofing for distinctive, long-lasting curb appeal. Weather-resistant systems engineered for New Jersey winters.',
    icon: 'Waves',
  },
  {
    name: 'Skylight Installation & Repair',
    slug: 'skylight-installation-repair',
    description:
      'Velux and fixed skylight installation, flashing repair, and leak sealing. Bring natural light into your home without sacrificing a watertight roof.',
    icon: 'Sun',
  },
  {
    name: 'Chimney Flashing Repair',
    slug: 'chimney-flashing-repair',
    description:
      'Expert chimney flashing replacement and sealing to stop persistent roof leaks. One of the most common sources of water damage in older homes.',
    icon: 'Flame',
  },
  {
    name: 'Gutter Guard Installation',
    slug: 'gutter-guard-installation',
    description:
      'Leaf and debris protection systems that keep your gutters flowing freely year-round. Prevents clogs, ice dams, and foundation water damage.',
    icon: 'Umbrella',
  },
] as const
