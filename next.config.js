/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/wikipedia/commons/*'
      },
      {
        protocol: 'https',
        hostname: 'seeklogo.com',
        pathname: '/images/*'
      }

    ]
  }
}

module.exports = nextConfig
