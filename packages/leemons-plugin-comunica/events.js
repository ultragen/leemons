/* eslint-disable global-require */
const { addLocales } = require('./src/services/locales/addLocales');

async function events() {
  leemons.events.once('plugins.multilanguage:pluginDidLoad', async () => {
    await addLocales(['es', 'en']);
  });

  leemons.events.on('plugins.multilanguage:newLocale', async (event, locale) => {
    await addLocales(locale.code);
  });
}

module.exports = events;
