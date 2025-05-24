/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'fr', 'es', 'de', 'it', 'pt', 'nl', 'pl', 'ru', 'ja'],
    defaultLocale: 'en',
    localeDetection: true,
  },
  images: {
    domains: [
      'github.com',
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com'
    ]
  },
  // Enable SWC minification
  swcMinify: true,
  // Disable x-powered-by header
  poweredByHeader: false,
  // Enable strict mode for better error catching
  typescript: {
    strict: true
  }
}

module.exports = nextConfig 