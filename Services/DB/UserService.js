const db = require("../../db")

const getUserStmt = db.prepare('SELECT * FROM users WHERE userId = ? AND guildId = ?');

const createOrUpdateUserStmt = db.prepare(`
  INSERT INTO users (userId, guildId, level, xp, points)
  VALUES (@userId, @guildId, @level, @xp, @points)
  ON CONFLICT(userId) DO UPDATE SET
    guildId = excluded.guildId,
    level = excluded.level,
    xp = excluded.xp,
    points = excluded.points
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

  addLevel(userId, amount, guildId){
    addLevelStmt.run(amount, userId)
  },

  getUserRank

};