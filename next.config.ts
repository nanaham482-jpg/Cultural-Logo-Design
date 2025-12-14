import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // 禁用构建时的ESLint检查（Netlify构建时可能缺少devDependencies）
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 禁用构建时的TypeScript类型检查（类型错误不会阻止构建）
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;

