const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'nl',
    locales: ['en', 'nl'],
  },
  localePath: path.resolve('./public/locales'),
};
