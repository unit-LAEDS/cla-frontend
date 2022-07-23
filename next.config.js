/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["public.tsx", "public.ts"],
  reactStrictMode: true,
  env: {
    SECRET: process.env.SECRET,
  },
};

module.exports = nextConfig;
