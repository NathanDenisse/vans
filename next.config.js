/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Désactiver les erreurs ESLint pendant le build pour le déploiement
    ignoreDuringBuilds: true,
  },
  images: {
    // Configuration pour les images
    domains: [],
  },
}

module.exports = nextConfig 