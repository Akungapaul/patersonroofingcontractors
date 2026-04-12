export type Service = {
  readonly name: string
  readonly slug: string
  readonly description: string
  readonly icon: string
  readonly category?: string
}

export const services: readonly Service[] = [
  // ===========================
  // Repair & Maintenance (~10)
  // ===========================
  {
    name: 'Roof Repair',
    slug: 'roof-repair',
    description:
      'Fast, reliable roof leak repair for residential and commercial properties. We fix storm damage, missing shingles, and worn flashing.',
    icon: 'Wrench',
    category: 'Repair & Maintenance',
  },
  {
    name: 'Roof Leak Repair',
    slug: 'roof-leak-repair',
    description:
      'Expert roof leak detection and repair to stop water damage before it spreads. We trace leaks to their source and apply lasting fixes.',
    icon: 'Droplets',
    category: 'Repair & Maintenance',
  },
  {
    name: 'Storm Damage Roof Repair',
    slug: 'storm-damage-roof-repair',
    description:
      'Emergency storm damage assessment and repair. We work directly with your insurance company to streamline the claims process.',
    icon: 'CloudRain',
    category: 'Repair & Maintenance',
  },
  {
    name: 'Hail Damage Roof Repair',
    slug: 'hail-damage-roof-repair',
    description:
      'Specialized hail damage assessment and repair for shingle, metal, and flat roofs. Insurance claim assistance included.',
    icon: 'CloudRain',
    category: 'Repair & Maintenance',
  },
  {
    name: 'Wind Damage Roof Repair',
    slug: 'wind-damage-roof-repair',
    description:
      'Repair wind-lifted shingles, torn flashing, and structural wind damage. Fast response to prevent further exposure.',
    icon: 'Wind',
    category: 'Repair & Maintenance',
  },
  {
    name: 'Emergency Roof Repair',
    slug: 'emergency-roof-repair',
    description:
      '24/7 emergency roof tarping and repair. Immediate response to prevent further water damage to your home or business.',
    icon: 'AlertTriangle',
    category: 'Repair & Maintenance',
  },
  {
    name: 'Roof Inspection',
    slug: 'roof-inspection',
    description:
      'Thorough 21-point roof inspections for homebuyers, insurance claims, and preventive maintenance. Detailed written reports included.',
    icon: 'Search',
    category: 'Repair & Maintenance',
  },
  {
    name: 'Roof Maintenance Programs',
    slug: 'roof-maintenance-programs',
    description:
      'Scheduled maintenance plans to extend your roof lifespan. Includes biannual inspections, gutter cleaning, and minor repairs.',
    icon: 'ClipboardCheck',
    category: 'Repair & Maintenance',
  },
  {
    name: 'Roof Cleaning & Moss Removal',
    slug: 'roof-cleaning-moss-removal',
    description:
      'Professional roof cleaning to remove moss, algae, and debris that cause premature deterioration. Safe, low-pressure methods.',
    icon: 'Sparkles',
    category: 'Repair & Maintenance',
  },
  {
    name: 'Roof Patching',
    slug: 'roof-patching',
    description:
      'Targeted roof patching for small damaged areas. A cost-effective alternative to full replacement when damage is localized.',
    icon: 'Hammer',
    category: 'Repair & Maintenance',
  },

  // ===========================
  // Residential Roofing (~9)
  // ===========================
  {
    name: 'Residential Roof Installation',
    slug: 'residential-roof-installation',
    description:
      'Complete residential roof installation for new construction and full replacements. Expert craftsmanship with premium materials.',
    icon: 'Home',
    category: 'Residential Roofing',
  },
  {
    name: 'Asphalt Shingle Roofing',
    slug: 'asphalt-shingle-roofing',
    description:
      'Architectural and 3-tab asphalt shingle installation with industry-leading warranties. The most popular roofing choice for Passaic County homes.',
    icon: 'LayoutGrid',
    category: 'Residential Roofing',
  },
  {
    name: 'Slate Roof Installation & Repair',
    slug: 'slate-roof-installation-repair',
    description:
      'Natural and synthetic slate roofing for historic and premium homes. Expert installation and restoration preserving classic Passaic County architecture.',
    icon: 'Gem',
    category: 'Residential Roofing',
  },
  {
    name: 'Wood Shake Roofing',
    slug: 'wood-shake-roofing',
    description:
      'Traditional wood shake roofing installation and repair. Natural beauty and insulation for homes throughout Passaic County.',
    icon: 'TreePine',
    category: 'Residential Roofing',
  },
  {
    name: 'Metal Roof Installation & Repair',
    slug: 'metal-roof-installation-repair',
    description:
      'Standing seam and metal shingle roofing built to last 50+ years. Energy-efficient, fire-resistant, and available in a range of finishes.',
    icon: 'Shield',
    category: 'Residential Roofing',
  },
  {
    name: 'Flat Roof Installation & Repair',
    slug: 'flat-roof-installation-repair',
    description:
      'Expert flat roof systems for residential and multi-family buildings. TPO, EPDM, and modified bitumen options available.',
    icon: 'Building2',
    category: 'Residential Roofing',
  },
  {
    name: 'Tile Roof Installation & Repair',
    slug: 'tile-roof-installation-repair',
    description:
      'Clay and concrete tile roofing for distinctive, long-lasting curb appeal. Weather-resistant systems engineered for New Jersey winters.',
    icon: 'Waves',
    category: 'Residential Roofing',
  },
  {
    name: 'Cedar Shake Roofing',
    slug: 'cedar-shake-roofing',
    description:
      'Premium cedar shake installation and maintenance. Natural beauty with superior insulation properties for Passaic County homes.',
    icon: 'TreePine',
    category: 'Residential Roofing',
  },
  {
    name: 'Rubber Roofing (EPDM)',
    slug: 'rubber-roofing-epdm',
    description:
      'Durable EPDM rubber roofing for flat and low-slope residential roofs. Excellent waterproofing with a proven 30+ year track record.',
    icon: 'Layers',
    category: 'Residential Roofing',
  },

  // ===========================
  // Commercial Roofing (~11)
  // ===========================
  {
    name: 'Commercial Roof Installation',
    slug: 'commercial-roof-installation',
    description:
      'Full-service commercial roof installation for offices, warehouses, and retail. Engineered systems with manufacturer warranties.',
    icon: 'Factory',
    category: 'Commercial Roofing',
  },
  {
    name: 'Commercial Roof Repair',
    slug: 'commercial-roof-repair',
    description:
      'Rapid commercial roof repair to minimize business disruption. We service all commercial roofing systems including TPO, EPDM, and metal.',
    icon: 'Wrench',
    category: 'Commercial Roofing',
  },
  {
    name: 'Commercial Roof Replacement',
    slug: 'commercial-roof-replacement',
    description:
      'Complete commercial roof replacement with minimal operational downtime. Expert project management from assessment to final inspection.',
    icon: 'Building2',
    category: 'Commercial Roofing',
  },
  {
    name: 'TPO Roofing Installation',
    slug: 'tpo-roofing-installation',
    description:
      'Thermoplastic polyolefin roofing for commercial buildings. Energy-efficient, reflective, and highly durable flat roof membrane system.',
    icon: 'Sun',
    category: 'Commercial Roofing',
  },
  {
    name: 'EPDM Commercial Roofing',
    slug: 'epdm-commercial-roofing',
    description:
      'EPDM rubber membrane roofing for commercial flat roofs. Proven performance in all weather conditions with easy maintenance.',
    icon: 'Layers',
    category: 'Commercial Roofing',
  },
  {
    name: 'Modified Bitumen Roofing',
    slug: 'modified-bitumen-roofing',
    description:
      'Multi-ply modified bitumen roofing systems for superior waterproofing. Ideal for flat and low-slope commercial buildings.',
    icon: 'Flame',
    category: 'Commercial Roofing',
  },
  {
    name: 'Built-Up Roofing',
    slug: 'built-up-roofing',
    description:
      'Traditional built-up roofing (BUR) with alternating layers of bitumen and reinforcing fabric. Time-tested flat roof protection.',
    icon: 'Layers',
    category: 'Commercial Roofing',
  },
  {
    name: 'Commercial Metal Roofing',
    slug: 'commercial-metal-roofing',
    description:
      'Standing seam and corrugated metal roofing for commercial properties. 40-60 year lifespan with minimal maintenance requirements.',
    icon: 'Shield',
    category: 'Commercial Roofing',
  },
  {
    name: 'PVC Roofing',
    slug: 'pvc-roofing',
    description:
      'PVC single-ply membrane roofing for commercial buildings. Chemical-resistant, fire-rated, and highly reflective for energy savings.',
    icon: 'Zap',
    category: 'Commercial Roofing',
  },
  {
    name: 'Green Roof Installation',
    slug: 'green-roof-installation',
    description:
      'Vegetated green roof systems for commercial buildings. Reduce stormwater runoff, improve insulation, and create sustainable urban spaces.',
    icon: 'Leaf',
    category: 'Commercial Roofing',
  },
  {
    name: 'Spray Foam Roofing',
    slug: 'spray-foam-roofing',
    description:
      'Spray polyurethane foam roofing for seamless waterproofing and superior insulation. Ideal for irregular roof shapes and retrofits.',
    icon: 'PaintBucket',
    category: 'Commercial Roofing',
  },

  // ===========================
  // Components & Specialty (~10)
  // ===========================
  {
    name: 'Roof Flashing Installation & Repair',
    slug: 'roof-flashing-installation-repair',
    description:
      'Expert flashing installation and repair at roof intersections, valleys, and penetrations. Prevent leaks at the most vulnerable points.',
    icon: 'Ruler',
    category: 'Components & Specialty',
  },
  {
    name: 'Chimney Flashing Repair',
    slug: 'chimney-flashing-repair',
    description:
      'Expert chimney flashing replacement and sealing to stop persistent roof leaks. One of the most common sources of water damage in older homes.',
    icon: 'Flame',
    category: 'Components & Specialty',
  },
  {
    name: 'Skylight Installation & Repair',
    slug: 'skylight-installation-repair',
    description:
      'Velux and fixed skylight installation, flashing repair, and leak sealing. Bring natural light into your home without sacrificing a watertight roof.',
    icon: 'Sun',
    category: 'Components & Specialty',
  },
  {
    name: 'Fascia Installation & Repair',
    slug: 'fascia-installation-repair',
    description:
      'Fascia board replacement and repair to protect your roof edge and support your gutter system. Wood, aluminum, and PVC options.',
    icon: 'Ruler',
    category: 'Components & Specialty',
  },
  {
    name: 'Soffit Installation & Repair',
    slug: 'soffit-installation-repair',
    description:
      'Soffit installation and repair to maintain proper attic ventilation and protect rafters from moisture damage and pests.',
    icon: 'Ruler',
    category: 'Components & Specialty',
  },
  {
    name: 'Roof Vent Installation & Repair',
    slug: 'roof-vent-installation-repair',
    description:
      'Ridge vents, box vents, and powered ventilation installation. Proper roof ventilation extends shingle life and reduces energy costs.',
    icon: 'Wind',
    category: 'Components & Specialty',
  },
  {
    name: 'Roof Waterproofing',
    slug: 'roof-waterproofing',
    description:
      'Comprehensive waterproofing solutions including membrane coatings, sealants, and drainage improvements for leak-free protection.',
    icon: 'Umbrella',
    category: 'Components & Specialty',
  },
  {
    name: 'Roof Deck Repair & Replacement',
    slug: 'roof-deck-repair-replacement',
    description:
      'Plywood and OSB roof deck repair when water damage compromises your roof structure. Essential for a solid roofing foundation.',
    icon: 'Hammer',
    category: 'Components & Specialty',
  },
  {
    name: 'Roof Ventilation Installation',
    slug: 'roof-ventilation-installation',
    description:
      'Complete attic ventilation systems including ridge, soffit, and gable vents. Balance intake and exhaust for optimal roof performance.',
    icon: 'Wind',
    category: 'Components & Specialty',
  },
  {
    name: 'Attic Insulation',
    slug: 'attic-insulation',
    description:
      'Professional attic insulation installation and upgrades. Reduce energy costs and prevent ice dams with proper insulation levels.',
    icon: 'Thermometer',
    category: 'Components & Specialty',
  },

  // ===========================
  // Gutters & Drainage (~2)
  // ===========================
  {
    name: 'Gutter Installation & Repair',
    slug: 'gutter-installation-repair',
    description:
      'Seamless gutter installation and repair to protect your foundation. Custom-fit aluminum and copper gutters with leaf guard options.',
    icon: 'Droplets',
    category: 'Gutters & Drainage',
  },
  {
    name: 'Gutter Guard Installation',
    slug: 'gutter-guard-installation',
    description:
      'Leaf and debris protection systems that keep your gutters flowing freely year-round. Prevents clogs, ice dams, and foundation water damage.',
    icon: 'Umbrella',
    category: 'Gutters & Drainage',
  },

  // ===========================
  // Energy & Solar (~5)
  // ===========================
  {
    name: 'Solar Panel Roofing Installation',
    slug: 'solar-panel-roofing-installation',
    description:
      'Rooftop solar panel installation with proper flashing and waterproofing. Combine renewable energy with a watertight roof system.',
    icon: 'Sun',
    category: 'Energy & Solar',
  },
  {
    name: 'Solar Shingle Installation',
    slug: 'solar-shingle-installation',
    description:
      'Integrated solar shingles that generate electricity while functioning as your roof. Sleek appearance with cutting-edge technology.',
    icon: 'Zap',
    category: 'Energy & Solar',
  },
  {
    name: 'Energy-Efficient Roofing Solutions',
    slug: 'energy-efficient-roofing-solutions',
    description:
      'Cool roofing materials, reflective coatings, and insulation upgrades to reduce your energy bills and environmental footprint.',
    icon: 'Lightbulb',
    category: 'Energy & Solar',
  },
  {
    name: 'Silicone Roof Coating',
    slug: 'silicone-roof-coating',
    description:
      'Silicone roof coatings that restore aging flat roofs without full replacement. UV-resistant, waterproof, and highly reflective.',
    icon: 'PaintBucket',
    category: 'Energy & Solar',
  },
  {
    name: 'Elastomeric Roof Coating',
    slug: 'elastomeric-roof-coating',
    description:
      'Elastomeric coatings that expand and contract with temperature changes. Seal cracks, reflect heat, and extend your roof lifespan.',
    icon: 'PaintBucket',
    category: 'Energy & Solar',
  },

  // ===========================
  // Roof Replacement (~15)
  // ===========================
  {
    name: 'Full Roof Tear-Off',
    slug: 'full-roof-tear-off',
    description:
      'Complete removal of existing roofing materials down to the deck. The gold standard for replacement ensuring a clean, inspected substrate.',
    icon: 'HardHat',
    category: 'Roof Replacement',
  },
  {
    name: 'Roof Overlay Installation',
    slug: 'roof-overlay-installation',
    description:
      'Install new shingles over existing roofing for a cost-effective replacement option. Suitable when the existing deck is structurally sound.',
    icon: 'Layers',
    category: 'Roof Replacement',
  },
  {
    name: 'Re-Roofing',
    slug: 're-roofing',
    description:
      'Expert re-roofing services covering both tear-off and overlay options. We assess your roof and recommend the best replacement approach.',
    icon: 'Home',
    category: 'Roof Replacement',
  },
  {
    name: 'Insurance Roof Replacement',
    slug: 'insurance-roof-replacement',
    description:
      'Navigate the insurance claims process with our experienced team. We document damage, work with adjusters, and handle the full replacement.',
    icon: 'ClipboardCheck',
    category: 'Roof Replacement',
  },
  {
    name: 'Storm Damage Roof Replacement',
    slug: 'storm-damage-roof-replacement',
    description:
      'Full roof replacement after severe storm damage. Emergency tarping, insurance coordination, and premium replacement materials.',
    icon: 'CloudRain',
    category: 'Roof Replacement',
  },
  {
    name: 'Aging Roof Replacement',
    slug: 'aging-roof-replacement',
    description:
      'Proactive replacement of aging roofs before leaks start. We identify end-of-life signs and provide options to fit your budget and timeline.',
    icon: 'Clock',
    category: 'Roof Replacement',
  },
  {
    name: 'Asphalt Shingle Replacement',
    slug: 'asphalt-shingle-replacement',
    description:
      'Full asphalt shingle replacement with architectural or designer options. Upgrade your curb appeal and protection with modern shingle technology.',
    icon: 'LayoutGrid',
    category: 'Roof Replacement',
  },
  {
    name: 'Metal Roof Replacement',
    slug: 'metal-roof-replacement',
    description:
      'Replace aging roofs with durable standing seam or metal shingle systems. 50+ year lifespan with superior wind and fire resistance.',
    icon: 'Shield',
    category: 'Roof Replacement',
  },
  {
    name: 'Flat Roof Replacement',
    slug: 'flat-roof-replacement',
    description:
      'Commercial and residential flat roof replacement with TPO, EPDM, or modified bitumen. Proper drainage design included.',
    icon: 'Building2',
    category: 'Roof Replacement',
  },
  {
    name: 'Tile Roof Replacement',
    slug: 'tile-roof-replacement',
    description:
      'Clay and concrete tile roof replacement preserving the character of your home. Structural assessment and underlayment upgrade included.',
    icon: 'Waves',
    category: 'Roof Replacement',
  },
  {
    name: 'Slate Roof Replacement',
    slug: 'slate-roof-replacement',
    description:
      'Natural and synthetic slate roof replacement for historic and premium homes. Matching existing slate patterns and colors available.',
    icon: 'Gem',
    category: 'Roof Replacement',
  },
  {
    name: 'Wood Shake Replacement',
    slug: 'wood-shake-replacement',
    description:
      'Replace weathered wood shakes with new cedar or pressure-treated options. Restore the natural beauty and protection of your roof.',
    icon: 'TreePine',
    category: 'Roof Replacement',
  },
  {
    name: 'Cedar Shake Replacement',
    slug: 'cedar-shake-replacement',
    description:
      'Premium cedar shake replacement with hand-split or machine-cut options. Includes deck inspection and underlayment upgrade.',
    icon: 'TreePine',
    category: 'Roof Replacement',
  },
  {
    name: 'Rubber Roof Replacement',
    slug: 'rubber-roof-replacement',
    description:
      'EPDM rubber roof replacement for flat and low-slope buildings. Fully adhered or mechanically fastened systems available.',
    icon: 'Layers',
    category: 'Roof Replacement',
  },
  {
    name: 'Commercial Roof Membrane Replacement',
    slug: 'commercial-roof-membrane-replacement',
    description:
      'Full membrane replacement for commercial flat roofs. TPO, PVC, and EPDM options with manufacturer-backed warranties.',
    icon: 'Factory',
    category: 'Roof Replacement',
  },

  // ===========================
  // Design & Specialty (~5)
  // ===========================
  {
    name: 'Custom Roof Design & Consultation',
    slug: 'custom-roof-design-consultation',
    description:
      'Architectural roof design consultation for custom homes and renovations. Material selection, color coordination, and structural planning.',
    icon: 'Ruler',
    category: 'Design & Specialty',
  },
  {
    name: 'Historic Roof Restoration',
    slug: 'historic-roof-restoration',
    description:
      'Period-accurate roof restoration for historic Passaic County homes. We source authentic materials and follow preservation guidelines.',
    icon: 'Gem',
    category: 'Design & Specialty',
  },
  {
    name: 'Roof Ice Dam Prevention',
    slug: 'roof-ice-dam-prevention',
    description:
      'Ice dam prevention systems including heat cables, ventilation improvements, and insulation upgrades for New Jersey winters.',
    icon: 'Thermometer',
    category: 'Design & Specialty',
  },
  {
    name: 'Roof Thermal Imaging Inspections',
    slug: 'roof-thermal-imaging-inspections',
    description:
      'Advanced thermal imaging to detect hidden moisture, insulation gaps, and energy loss without invasive testing.',
    icon: 'Eye',
    category: 'Design & Specialty',
  },
  {
    name: 'Infrared Roof Leak Detection',
    slug: 'infrared-roof-leak-detection',
    description:
      'Precision infrared technology to pinpoint roof leaks and moisture intrusion invisible to the naked eye. Non-destructive and accurate.',
    icon: 'Eye',
    category: 'Design & Specialty',
  },
] as const
