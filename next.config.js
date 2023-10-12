/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'localhost',
      'karma.houdiniswap.com',
    ],
  },
  env: {
    NEXT_APP_EXAMPLE: process.env.NEXT_APP_EXAMPLE || 'test',
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }],
    })
    return config
  },
}

module.exports = nextConfig
