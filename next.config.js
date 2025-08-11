/** @type {import('next').NextConfig} */
const nextConfig = {
  // React の厳格モードを有効化（開発中の潜在的な問題を検出）
  reactStrictMode: true,

  // SWC による最適化を有効化（ビルド・トランスパイルの高速化）
  swcMinify: true,

  // 画像ドメイン設定（必要であれば拡張）
  images: {
    domains: ['images.unsplash.com', 'cdn.example.com','enzostvs-deepsite.hf.space','huggingface.co','res.cloudinary.com'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 768, 1024],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // i18n 言語設定（不要なら削除可）
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  },


  // エクスペリメンタル設定（Next.js 13 App Router 使用時など）
  // experimental: {
  //   appDir: true  // Next.js 13.4+ では不要
  // }
};

module.exports = nextConfig;
