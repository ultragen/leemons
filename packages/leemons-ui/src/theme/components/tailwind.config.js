const plugin = require('tailwindcss/plugin');
const colors = require('../../../dist/theme/colors');
const base = require('../../../dist/theme/base');
const utilities = require('../../../dist/theme/utilities');
const utilitiesStyled = require('../../../dist/theme/utilities-styled');
const utilitiesUnstyled = require('../../../dist/theme/utilities-unstyled');

module.exports = {
  theme: {
    colors,
  },
  plugins: [
    plugin(({ addBase, addUtilities }) => {
      addBase(base);
      addUtilities(utilities, { variants: ['responsive'] });
      addUtilities(utilitiesUnstyled, { variants: ['responsive'] });
      addUtilities(utilitiesStyled, { variants: ['responsive'] });
    }),
  ],
};