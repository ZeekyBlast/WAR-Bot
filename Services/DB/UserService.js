const db = require("../../db")

const getUserStmt = db.prepare('SELECT * FROM users WHERE userId = ? AND guildId = ?');

const createOrUpdateUserStmt = db.prepare(`
  INSERT INTO users (userId, guildId, level, xp, points, invites)
  VALUES (@userId, @guildId, @level, @xp, @points, @invites)
  ON CONFLICT(userId) DO UPDATE SET
    guildId = excluded.guildId,
    level = excluded.level,
    xp = excluded.xp,
    points = excluded.points,
    invites = excluded.invites
`);

const addXPStmt = db.prepare(`
  UPDATE users SET xp = xp + ? WHERE userId = ? AND guildId = ?
`);

const addPointStmt = db.prepare(`
  UPDATE users SET points = points + ? WHERE userId = ? AND guildId = ?
`);

const addLevelStmt = db.prepare(`
  UPDATE users SET level = level + ? WHERE userId = ? AND guildId = ?
`);

const addInviteStmt = db.prepare(`
  UPDATE users SET invites = invites + ? WHERE userId = ? AND guildId = ?   
`)

function getUserRank(userId, guildId){
  const users = db.prepare(`
        SELECT userId, level, xp
        FROM users
        WHERE guildId = ?
        ORDER BY level DESC, xp DESC
    `).all(guildId);

    const index = users.findIndex(u => u.userId === userId)

    return{
        rank: index === -1 ? 0 : index + 1,
        total: users.length
    }

}

module.exports = {
  getUser(userId, guildId) {
    return getUserStmt.get(userId, guildId);
  },

  saveUser(data) {
    createOrUpdateUserStmt.run(data);
  },

  addXP(userId, amount, guildId) {
    addXPStmt.run(amount, userId);
  },

  addPoints(userId, amount, guildId){
    addPointStmt.run(amount, userId)
  },

  addLevel(userId, amount){
    addLevelStmt.run(amount, userId)
  },

  addInvite(userId, amount, guildId){
    addInviteStmt.run(amount, userId, guildId)
  },

  getUserRank

};