import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  // Ensure the `@` path alias resolves during Next.js webpack build
  webpack: (config) => {
    if (!config.resolve) config.resolve = {} as any;
    if (!config.resolve.alias) config.resolve.alias = {} as any;
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    return config;
  },
  // Add an explicit (empty) turbopack config to allow Next.js to build
  // while retaining a webpack config for environments that rely on it.
  turbopack: {},
};

export default nextConfig;
