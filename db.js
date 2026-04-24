const Database = require('better-sqlite3');
const db = new Database('data.db');

db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    userId TEXT PRIMARY KEY,
    level INTEGER DEFAULT 1,
    xp INTEGER DEFAULT 0,
    points INTEGER DEFAULT 0
  )
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS command_roles (
      guildId TEXT,
      commandName TEXT,
      roleId TEXT,
      PRIMARY KEY (guildId, commandName, roleId)
    )
  `)

module.exports = db;
