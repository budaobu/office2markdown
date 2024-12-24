/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // 为客户端构建配置 wasm 支持
    if (!isServer) {
      config.experiments = {
        ...config.experiments,
        asyncWebAssembly: true,
      }
    }

    // 添加 worker-loader 支持
    config.module.rules.push({
      test: /\.worker\.(js|ts)$/,
      loader: 'worker-loader',
      options: {
        filename: 'static/[hash].worker.js',
        publicPath: '/_next/',
      },
    })

    return config
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' https://testingcf.jsdelivr.net; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://testingcf.jsdelivr.net https://www.googletagmanager.com https://static.cloudflareinsights.com; connect-src 'self' https://testingcf.jsdelivr.net; img-src 'self' data:; style-src 'self' 'unsafe-inline'; worker-src 'self' blob:;",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig

