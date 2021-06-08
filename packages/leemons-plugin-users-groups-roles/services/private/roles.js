const _ = require('lodash');
const constants = require('../../config/constants');

const table = {
  rolePermission: leemons.query('plugins_users-groups-roles::role-permission'),
  permissions: leemons.query('plugins_users-groups-roles::permissions'),
  roles: leemons.query('plugins_users-groups-roles::roles'),
  userRole: leemons.query('plugins_users-groups-roles::user-role'),
  groupRole: leemons.query('plugins_users-groups-roles::group-role'),
  groupUser: leemons.query('plugins_users-groups-roles::group-user'),
};

class Roles {
  /**
   * Creates the default roles that come with the leemons app
   * @public
   * @static
   * */
  static async init() {
    await Promise.all(
      _.map(constants.defaultRoles, (role) => Roles.createRole(role.name, role.permissions))
    );
  }

  /**
   * Creates or updates a role based on whether the name is already in use
   * @public
   * @static
   * @param {string} name - Role name
   * @param {string[]} permissions - Array of permissions
   * @return {Promise<Role>} Created / Updated role
   * */
  static async createRole(name, permissions) {
    return Roles.registerRole(null, name, permissions);
  }

  /**
   * Update the provided role
   * @public
   * @static
   * @param {string} id - Role id
   * @param {string[]} permissions - Array of permissions
   * @return {Promise<Role>} Created / Updated role
   * */
  static async updateRole(id, permissions) {
    return Roles.registerRole(id, null, permissions);
  }

  /**
   * Create / Update one role
   * If id is provided we update the role
   * If name is provided we check if already exist one role with this name, if exist we update if not we create it
   * @private
   * @static
   * @param {string=} id - Role id
   * @param {string=} name - Role name
   * @param {string[]} permissions - Array of permissions
   * @return {Promise<Role>} Created / Updated role
   * */
  static async registerRole(id, name, permissions) {
    const values = await Promise.all([
      id ? table.roles.findOne({ id }) : table.roles.findOne({ name }),
      table.permissions.count({ permissionName_$in: permissions }),
    ]);

    if (values[1] !== permissions.length)
      throw new Error('One or more of the permits do not exist');

    return table.rolePermission.transaction(async (transacting) => {
      let role = values[0];
      if (role) {
        // If the role already exists, we update its fields and delete its permissions and then create the new ones.
        leemons.log.info(`Updating role '${name}'`);
        await Promise.all([
          table.roles.update({ id: role.id }, { name }, { transacting }),
          table.rolePermission.deleteMany({ role: role.id }, { transacting }),
          Roles.searchUsersWithRoleAndMarkAsReloadPermissions(role.id, transacting),
        ]);
      } else {
        // If the role does not exist, we create it
        leemons.log.info(`Creating role '${name}'`);
        role = await table.roles.create({ name }, { transacting });
      }

      await table.rolePermission.createMany(
        _.map(permissions, (permission) => ({
          role: role.id,
          permission,
        })),
        { transacting }
      );

      return role;
    });
  }

  /**
   * Searches for the users that have that role, the groups that have that role and the users
   * that are in that groups.
   * @private
   * @static
   * @param {string} roleId - Role id
   * @param {any} transacting - Database transaction
   * @return {Promise<any>}
   * */
  static async searchUsersWithRoleAndMarkAsReloadPermissions(roleId, transacting) {
    const [userRoles, groupRoles] = await Promise.all([
      table.userRole.find({ role: roleId }, { columns: ['user'] }, { transacting }),
      table.groupRole.find({ role: roleId }, { columns: ['group'] }, { transacting }),
    ]);

    const groupUser = await table.groupUser.find(
      { group_$in: _.map(groupRoles, 'group') },
      { columns: ['user'] },
      { transacting }
    );

    const userIds = _.uniq(_.map(userRoles, 'user').concat(_.map(groupUser, 'user')));

    return table.users.updateMany(
      { id_$in: userIds },
      { reloadPermissions: true },
      { transacting }
    );
  }
}

module.exports = Roles;
