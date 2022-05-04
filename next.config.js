const i18n = require('./next-i18next.config.js').i18n;

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.datocms-assets.com'],
  },
  i18n,
};

module.exports = nextConfig;
