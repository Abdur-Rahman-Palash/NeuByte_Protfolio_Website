/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hostinger hosting optimizations (without static export for API support)
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  
  // Image optimization for Hostinger
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "neubyte.tech",
      },
      {
        protocol: "https",
        hostname: "*.neubyte.tech",
      },
    ],
  },
  
  // Base path for subdirectory hosting (if needed)
  // basePath: '',
  
  // Asset prefix for CDN (if needed)
  // assetPrefix: '',
  
  // Custom webpack config
  webpack: (config, { isServer }) => {
    // Client-side: exclude Node.js modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }
    return config;
  },
  
  // Security headers for production
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
        ],
      },
    ];
  },
};

module.exports = nextConfig;
