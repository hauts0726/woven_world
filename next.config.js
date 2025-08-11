/** @type {import('next').NextConfig} */
const nextConfig = {
  // React の厳格モードを有効化（開発中の潜在的な問題を検出）
  reactStrictMode: true,

  // 画像ドメイン設定（必要であれば拡張）
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.example.com',
      },
      {
        protocol: 'https',
        hostname: 'enzostvs-deepsite.hf.space',
      },
      {
        protocol: 'https',
        hostname: 'huggingface.co',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 768, 1024],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ビルド時のタイムアウト設定
  staticPageGenerationTimeout: 120,

  // エクスペリメンタル設定
  experimental: {
    optimizePackageImports: ['@next/font'],
  },
};

module.exports = nextConfig;
