export type Testimonial = {
  readonly name: string
  readonly city: string
  readonly rating: number
  readonly text: string
}

export const testimonials: readonly Testimonial[] = [
  {
    name: 'Michael T.',
    city: 'Clifton',
    rating: 5,
    text: "After the last nor'easter damaged our roof, Paterson Roofing had a crew out within hours. Professional, thorough, and the price was very fair. Our roof looks better than before the storm.",
  },
  {
    name: 'Sarah K.',
    city: 'Wayne',
    rating: 5,
    text: 'We got three estimates for a full roof replacement and Paterson Roofing was the best value by far. The crew was courteous, cleaned up everything, and finished ahead of schedule. Highly recommend.',
  },
  {
    name: 'Roberto M.',
    city: 'Paterson',
    rating: 5,
    text: "I've used them twice now -- once for a leak repair and once for gutter installation. Both times they showed up on time, explained everything clearly, and the work has held up perfectly. They're our go-to roofers.",
  },
] as const
