/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Ignorer complètement ESLint pendant le build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignorer les erreurs TypeScript pendant le build
    ignoreBuildErrors: true,
  },
  images: {
    // Configuration pour les images
    domains: [],
    unoptimized: true,
  },
  // Configuration pour Netlify
  output: 'standalone',
  trailingSlash: false,
}

module.exports = nextConfig 