// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  compress: false,
  reactStrictMode: true,
  output: "standalone",
  distDir: "build",
};

module.exports = nextConfig;
