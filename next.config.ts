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
  // Next.js 16: ESLint配置已移至next lint命令，不再在next.config.ts中配置
  // 禁用构建时的TypeScript类型检查（类型错误不会阻止构建）
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;

