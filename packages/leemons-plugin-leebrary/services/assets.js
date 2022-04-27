const { exists } = require('../src/services/assets/exists');
const { add } = require('../src/services/assets/add');
const { getByIds } = require('../src/services/assets/getByIds');
const { update } = require('../src/services/assets/update');

module.exports = {
  getByIds,
  exists,
  update,
  add,
};
