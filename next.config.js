/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(graphql|gql)/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    });
    return config;
  },
  reactStrictMode: true,
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
  },
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
