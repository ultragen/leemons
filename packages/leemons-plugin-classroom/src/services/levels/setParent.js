const levels = leemons.query('plugins_classroom::levels');

// TODO: Check that the parent is compatible
module.exports = async function setParent(id, parent, { transacting } = {}) {
  // ---------------------------------------------------------------------------
  // validate data types
  const schema = {
    type: 'object',
    properties: {
      parent: {
        type: 'string',
        format: 'uuid',
      },
      id: {
        type: 'string',
        format: 'uuid',
      },
    },
  };
  const validator = new global.utils.LeemonsValidator(schema);

  if (validator.validate({ id, parent })) {
    if (parent === id) {
      throw new Error("The parent can't be itself");
    }
    let level = await levels.findOne({ id }, { transacting });
    if (!level) {
      throw new Error("The given id can't be found");
    }

    if (level.parent === parent) {
      return level;
    }

    const parentLS = await levels.count({ id: parent, isClass: true }, { transacting });
    if (parentLS) {
      throw new Error("The parent can't be of type class");
    }

    try {
      level = await levels.update({ id }, { parent }, { transacting });
    } catch (e) {
      if (e.code.includes('ER_NO_REFERENCED_ROW')) {
        throw new Error("The given parent can't be found");
      }
      throw new Error("the new parent can't be saved");
    }
    return level;
  }
  throw validator.error;
};