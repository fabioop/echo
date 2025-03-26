/**
 * Modules dependencies.
 */

import type { NextConfig } from 'next';

/**
 * Next.js configuration.
 */

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: '**',
      },
    ],
  },
  reactStrictMode: true,
};

/**
 * Export `nextConfig`.
 */

export default nextConfig;
