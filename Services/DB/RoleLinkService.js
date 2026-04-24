const db = require("../../db");

const addLink = db.prepare(`
  INSERT OR IGNORE INTO command_roles (guildId, commandName, roleId)
  VALUES (?, ?, ?)
`);

const removeLink = db.prepare(`
  DELETE FROM command_roles
  WHERE guildId = ? AND commandName = ? AND roleId = ?
`);

const getRolesForCommand = db.prepare(`
  SELECT roleId FROM command_roles
  WHERE guildId = ? AND commandName = ?
`);

module.exports = {
  linkRole(guildId, commandName, roleId) {
    addLink.run(guildId, commandName, roleId);
  },

  unlinkRole(guildId, commandName, roleId) {
    removeLink.run(guildId, commandName, roleId);
  },

  getRoles(guildId, commandName) {
    return getRolesForCommand.all(guildId, commandName).map(r => r.roleId);
  }
};
