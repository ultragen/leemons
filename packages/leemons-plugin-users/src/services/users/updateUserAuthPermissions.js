const _ = require('lodash');
const { existUserAuth } = require('./existUserAuth');
const { table } = require('../tables');

/**
 * EN:
 * Updates the permissions of the user if it is marked as reload permissions according to their
 * roles and the roles of the groups to which they belong.
 *
 * ES:
 * Borra todos los permisos que ya tuviera el usuario que vinieran desde un rol y vuelve a generar
 * todos los permisos desde los roles en los que esta el usuario
 *
 * @public
 * @static
 * @param {string} userAuthId - User auth id
 * @param {any=} transacting - DB Transaction
 * @return {Promise<any>}
 * */
async function updateUserAuthPermissions(userAuthId, { transacting: _transacting } = {}) {
  await existUserAuth({ id: userAuthId }, true, { transacting: _transacting });
  return global.utils.withTransaction(
    async (transacting) => {
      const [groupUserAuth, userAuth] = await Promise.all([
        table.groupUserAuth.find({ userAuth: userAuthId }, { columns: ['group'], transacting }),
        table.userAuth.update({ id: userAuthId }, { reloadPermissions: false }, { transacting }),
        table.userAuthPermission.deleteMany(
          {
            userAuth: userAuthId,
            role_$null: false,
          },
          { transacting }
        ),
      ]);

      const [groupRoles, profileRoles] = await Promise.all([
        table.groupRole.find(
          { group_$in: _.map(groupUserAuth, 'group') },
          { columns: ['role'], transacting }
        ),
        table.profileRole.find({ profile: userAuth.profile }, { columns: ['role'], transacting }),
      ]);

      const roleIds = _.uniq(_.map(profileRoles, 'role').concat(_.map(groupRoles, 'role')));

      const rolePermissions = await table.rolePermission.find(
        { role_$in: roleIds },
        { transacting }
      );

      return table.userAuthPermission.createMany(
        _.map(rolePermissions, (rolePermission) => ({
          userAuth: userAuthId,
          role: rolePermission.role,
          permissionName: rolePermission.permissionName,
          actionName: rolePermission.actionName,
          target: rolePermission.target,
        })),
        { transacting }
      );
    },
    table.userAuth,
    _transacting
  );
}

module.exports = { updateUserAuthPermissions };