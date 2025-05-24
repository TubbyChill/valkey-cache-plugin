/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.NODE_ENV === 'production' 
      ? 'https://api.valkey-cache-plugin.com' 
      : 'http://localhost:4000'
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'production'
          ? 'https://api.valkey-cache-plugin.com/api/:path*'
          : 'http://localhost:4000/api/:path*'
      }
    ]
  }
}

module.exports = nextConfig 