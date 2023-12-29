/** @type {import('next').NextConfig} */

const path = require('path')

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  experimental: {
    incrementalCacheHandlerPath: process.env.CUSTOM_CACHE_HANDLER
      ? require.resolve('./cache-handler.js')
      : undefined,
  }
}

module.exports = nextConfig
