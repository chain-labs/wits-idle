/** @type {import('next').NextConfig} */

const TEST_API_ENDPOINT = process.env.NEXT_PUBLIC_TEST_BACKEND;
const API_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND;

const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "ik.imagekit.io",
        protocol: "https",
      },
      {
        hostname: "s3.amazonaws.com",
        protocol: "https",
      },
    ],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
