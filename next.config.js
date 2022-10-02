/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "cdn.sanity.io",
      "pbs.twimg.com",
      "https://lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
