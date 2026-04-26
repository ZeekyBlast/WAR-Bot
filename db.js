const Database = require('better-sqlite3');
const db = new Database('data.db');

db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    userId TEXT PRIMARY KEY,
    guildId TEXT,
    level INTEGER DEFAULT 1,
    xp INTEGER DEFAULT 0,
    points INTEGER DEFAULT 0,
    invites INTEGER DEFAULT 0
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

db.exec(`
     CREATE TABLE IF NOT EXISTS cases (
       caseNumber INTEGER DEFAULT 0,
       userId TEXT,
       guildId TEXT,
       caseType TEXT CHECK(caseType IN ('mute', 'kick', 'ban', 'warn')),
       caseReason TEXT,
       PRIMARY KEY (caseNumber, guildId)
     )
  `)

db.exec(`
     CREATE TABLE IF NOT EXISTS channels (
      guildId TEXT
      logs TEXT
      welcome TEXT
      invites TEXT
      PRIMARY KEY (guildId)
     )
  `)

module.exports = db;
