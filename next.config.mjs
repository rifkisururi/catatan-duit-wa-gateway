/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@neondatabase/serverless'],
  },
  webpack: (config, { isServer }) => {
    // Exclude heavy dependencies from middleware
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@/lib/db': false,
        '@/lib/auth': false,
      };
    }
    return config;
  },
};

export default nextConfig;
