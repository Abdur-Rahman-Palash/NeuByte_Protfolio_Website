/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export configuration
  output: process.env.STATIC_BUILD === 'true' ? 'export' : undefined,
  distDir: process.env.STATIC_BUILD === 'true' ? 'out' : '.next',
  
  // Vercel deployment with API routes
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  
  // Image optimization for Vercel
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
};

module.exports = nextConfig;
