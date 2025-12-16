import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'www.lifestyle-collection.com.pk', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'en-pk.svestonwatches.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'i.pinimg.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'sharpmagazine.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'bezlmagazine.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'www.swisswatchexpo.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'cdn.shopify.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'wornandwound.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'res.cloudinary.com', port: '', pathname: '/**' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            // UPDATE: Added 'frame-src' to allow YouTube embeds
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https:; font-src 'self' data:; frame-src 'self' https://www.youtube.com https://youtube.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;