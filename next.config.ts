import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Allow the sandbox preview host to reach the dev server.
  allowedDevOrigins: ['*.e2b.app'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
}

export default nextConfig
