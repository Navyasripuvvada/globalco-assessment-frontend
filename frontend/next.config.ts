import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "https://globalco-assessment-backend-eight.vercel.app/"}/:path*`,
      },
    ];
  },
};

export default nextConfig;
