import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/longevity-score',
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
