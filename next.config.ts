import type { NextConfig } from "next";

const basePath = '/longevity-score';

const nextConfig: NextConfig = {
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'longeviquest.com',
      },
    ],
  },
};

export default nextConfig;
