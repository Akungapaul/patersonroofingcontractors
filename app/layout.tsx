import type { Metadata } from 'next'
import { Cormorant, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

const cormorant = Cormorant({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant-garamond',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | Paterson Roofing Contractors',
    default: 'Paterson Roofing Contractors | Top-Rated Roofer in Paterson NJ',
  },
  description:
    'Paterson\'s most trusted roofing contractor. Roof repair, replacement & installation serving Paterson and all of Passaic County, NJ. Free estimates, 24/7 emergency service. Call (973) 555-0100.',
  metadataBase: new URL('https://patersonroofingcontractors.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Paterson Roofing Contractors',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${cormorantGaramond.variable}`}
    >
      <body>
        <Header />
        <main id="main-content">
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
