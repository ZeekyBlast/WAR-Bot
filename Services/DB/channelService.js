const db = require("../../db");

const getChannelStmt = db.prepare('SELECT * FROM channels WHERE guildId = ?')

const createOrUpdateChannelStmt = db.prepare(`
    INSERT INTO channels (guildId, logs, welcome, invites)
    VALUES (@guildId, @logs, @welcome, @invites)
    ON CONFLICT(guildId) DO UPDATE SET
        guildId = excluded.guildId,
        logs = excluded.logs,
        welcome = excluded.welcome,
        invites = excluded.invites
    `)

const updateLogsChannelStmt = db.prepare(`
    UPDATE channels SET logs = ? WHERE guildId = ?
    `)

const updateWelcomeChannelStmt = db.prepare(`
    UPDATE channels SET welcome = ? WHERE guildId = ?
    `)

const updateInviteChannelStmt = db.prepare(`
    UPDATE channels SET invites = ? WHERE guildId = ?
    `)

module.exports = {
    getChannel(guildId){
        return getChannelStmt.get(guildId)
    },

    saveChnl(data){
        createOrUpdateChannelStmt.run(data)
    },

    updateLogs(guildId, logs){
        updateLogsChannelStmt.run(guildId, logs)
    },

    updateWelcome(guildId, welcome){
        updateWelcomeChannelStmt.run(guildId, welcome)
    },

    updateInvite(guildId, invite){
        updateInviteChannelStmt.run(guildId, invite)
    }
}