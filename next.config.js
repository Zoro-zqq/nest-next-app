/** @type {import('next').NextConfig}  */
const { join } = require('path')

const nextConfig = {
  reactStrictMode: false,
  // distDir: "./public/next",
  // basePath: "/home", //node
  sassOptions: {
    includePaths: [join(__dirname, './src/pages/styles')],
    prependData: `@import "global.scss";`
  },
  compiler: {
    styledComponents: true
  },
  typescript: {
    tsconfigPath: './tsconfig.next.json'
  }
}

module.exports = nextConfig
