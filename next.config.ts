import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "cdn.sanity.io",
      "images.pexels.com",
      "titanscareers.s3.amazonaws.com",
    ],
  },
};

export default nextConfig;
