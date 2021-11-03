const _ = require('lodash');
const { table } = require('../tables');
const { setActiveProvider } = require('./setActiveProvider');

async function setProviderConfig(providerName, config, { transacting: _transacting } = {}) {
  return global.utils.withTransaction(
    async (transacting) => {
      const provider = leemons.getProvider(providerName);
      if (provider && provider.service) {
        if (!provider.service.provider)
          throw new Error('Bad implementation for media library, need the service: provider');
        if (!provider.service.provider.setConfig)
          throw new Error(
            'Bad implementation for media library, the service provider need the function: setConfig'
          );
        await setActiveProvider(providerName, { transacting });
        return provider.service.provider.setConfig(config, { transacting });
      }
      throw new Error(`The provider "${providerName}" not found`);
    },
    table.activeProvider,
    _transacting
  );
}

module.exports = { setProviderConfig };