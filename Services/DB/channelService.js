const db = require("../../db");

const getChannelStmt = db.prepare('SELECT * FROM channels WHERE guildId = ?')

const createOrUpdateChannelStmt = db.prepare(`
    INSERT INTO channels (guildId, logs, welcome, invites, logSettings)
    VALUES (@guildId, @logs, @welcome, @invites, @logSettings)
    ON CONFLICT(guildId) DO UPDATE SET
        guildId = excluded.guildId,
        logs = excluded.logs,
        welcome = excluded.welcome,
        invites = excluded.invites,
        logSettings = excluded.logSettings
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

const updateLogSettingsStmt = db.prepare(`
    UPDATE channels SET logSettings = ? WHERE guildId = ?
    `)

module.exports = {
    getChannel(guildId){
        return getChannelStmt.get(guildId)
    },

    saveChnl(data){
        createOrUpdateChannelStmt.run(data)
    },

    updateLogs(guildId, logs){
        updateLogsChannelStmt.run(logs, guildId)
    },

    updateWelcome(guildId, welcome){
        updateWelcomeChannelStmt.run(welcome, guildId)
    },

    updateInvite(guildId, invite){
        updateInviteChannelStmt.run(invite, guildId)
    },

    updateLogSettings(guildId, settings){
        updateLogsChannelStmt.run(settings, guildId)
    },

    updateField(guildId, field, value){
        const smt = db.prepare(`UPDATE channels SET ${field} = ? WHERE guildId = ?`)
        smt.run(value, guildId)
    }
}