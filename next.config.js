/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');

const nextConfig = withPWA({
  reactStrictMode: false, // https://github.com/vercel/next.js/issues/35822
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    // disable: process.env.NODE_ENV === 'development',
    mode: 'production',
  },
  images: {
    domains: ['gchat.qpic.cn'],
  },
});

module.exports = nextConfig;
