// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img-financessignal-s3.s3.sa-east-1.amazonaws.com', // S3
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'd1gbtbhodg3cj1.cloudfront.net', // CloudFront
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [25, 50, 75]
  },
};

module.exports = nextConfig;
