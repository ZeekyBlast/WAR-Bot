const db = require("../../db")

const getUserStmt = db.prepare('SELECT * FROM users WHERE userId = ?');

const createOrUpdateUserStmt = db.prepare(`
  INSERT INTO users (userId, level, xp, points)
  VALUES (@userId, @level, @xp, @points)
  ON CONFLICT(userId) DO UPDATE SET
    level = excluded.level,
    xp = excluded.xp,
    points = excluded.points
`);

const addXPStmt = db.prepare(`
  UPDATE users SET xp = xp + ? WHERE userId = ?
`);

module.exports = {
  getUser(userId) {
    return getUserStmt.get(userId);
  },

  saveUser(data) {
    createOrUpdateUserStmt.run(data);
  },

  addXP(userId, amount) {
    addXPStmt.run(amount, userId);
  }
};