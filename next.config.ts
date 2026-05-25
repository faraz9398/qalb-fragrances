import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qalbfragrances.com",
        pathname: "/cdn/shop/files/**",
      },
    ],
  },
};

export default nextConfig;
