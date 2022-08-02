/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["public.tsx", "public.ts"],
  reactStrictMode: true,
  env: {
    SECRET: process.env.SECRET,
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    LAEDS_API: process.env.LAEDS_API,
  },
};

module.exports = nextConfig;
