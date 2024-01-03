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
    NEXT_APP_GQL_USER_API: process.env.NEXT_APP_GQL_USER_API || 'http://localhost:3000/graphql',
    NEXT_APP_PROJECT_ID: process.env.NEXT_APP_PROJECT_ID || 'abc9963bae7aada93688306adde907e5',
    NEXT_APP_NODE_ENV: process.env.NEXT_APP_NODE_ENV || 'development',
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
