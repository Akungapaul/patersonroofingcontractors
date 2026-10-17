import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/services/roof-repair',
        destination: '/roof-repair-paterson-nj',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.patersonroofingcontractors.com' }],
        destination: 'https://patersonroofingcontractors.com/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
