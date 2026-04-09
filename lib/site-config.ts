export const siteConfig = {
  businessName: 'Paterson Roofing Contractors',
  phone: '(973) 555-0100',
  phoneRaw: '+19735550100',
  email: 'info@patersonroofingcontractors.com',
  url: 'https://patersonroofingcontractors.com',

  businessHours: [
    { day: 'Monday' as const, opens: '07:00', closes: '18:00' },
    { day: 'Tuesday' as const, opens: '07:00', closes: '18:00' },
    { day: 'Wednesday' as const, opens: '07:00', closes: '18:00' },
    { day: 'Thursday' as const, opens: '07:00', closes: '18:00' },
    { day: 'Friday' as const, opens: '07:00', closes: '18:00' },
    { day: 'Saturday' as const, opens: '08:00', closes: '14:00' },
    { day: 'Sunday' as const, opens: 'Closed', closes: 'Closed' },
  ],

  stats: {
    yearsExperience: '15+',
    projectsCompleted: '2,500+',
    rating: '5-Star',
    citiesServed: '16',
  },

  municipalities: [
    { name: 'Paterson', slug: 'paterson', type: 'City', cluster: 'Urban', population: 159732 },
    { name: 'Clifton', slug: 'clifton', type: 'City', cluster: 'Urban', population: 90296 },
    { name: 'Passaic', slug: 'passaic', type: 'City', cluster: 'Urban', population: 72290 },
    { name: 'Wayne', slug: 'wayne', type: 'Township', cluster: 'Suburban', population: 53665 },
    { name: 'West Milford', slug: 'west-milford', type: 'Township', cluster: 'Highlands', population: 25637 },
    { name: 'Hawthorne', slug: 'hawthorne', type: 'Borough', cluster: 'Suburban', population: 19457 },
    { name: 'Little Falls', slug: 'little-falls', type: 'Township', cluster: 'Suburban', population: 14886 },
    { name: 'Woodland Park', slug: 'woodland-park', type: 'Borough', cluster: 'Suburban', population: 13021 },
    { name: 'Ringwood', slug: 'ringwood', type: 'Borough', cluster: 'Highlands', population: 12229 },
    { name: 'Wanaque', slug: 'wanaque', type: 'Borough', cluster: 'Highlands', population: 12033 },
    { name: 'Pompton Lakes', slug: 'pompton-lakes', type: 'Borough', cluster: 'Highlands', population: 11276 },
    { name: 'Totowa', slug: 'totowa', type: 'Borough', cluster: 'Suburban', population: 11189 },
    { name: 'North Haledon', slug: 'north-haledon', type: 'Borough', cluster: 'Suburban', population: 8828 },
    { name: 'Haledon', slug: 'haledon', type: 'Borough', cluster: 'Urban', population: 8541 },
    { name: 'Bloomingdale', slug: 'bloomingdale', type: 'Borough', cluster: 'Highlands', population: 8255 },
    { name: 'Prospect Park', slug: 'prospect-park', type: 'Borough', cluster: 'Urban', population: 6372 },
  ],
} as const
