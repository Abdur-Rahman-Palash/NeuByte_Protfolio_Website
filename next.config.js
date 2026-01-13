/** @type {import('next').NextConfig} */
// IMPORTANT: Static export is DISABLED for development
// Only enable it when building for production static hosting
const isStaticBuild = process.env.STATIC_BUILD === 'true';

const nextConfig = {
  // Disable static export for development (API routes need to work)
  // Only enable for production static builds
  ...(isStaticBuild ? { output: "export" } : {}),
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  skipTrailingSlashRedirect: true,
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

// Log the configuration (only in build time, not in dev)
if (typeof window === 'undefined' && process.env.NODE_ENV !== 'test') {
  if (isStaticBuild) {
    console.log('⚠️ Static export ENABLED - API routes will be excluded');
  } else {
    console.log('✅ Static export DISABLED - API routes will work');
  }
}

module.exports = nextConfig;
