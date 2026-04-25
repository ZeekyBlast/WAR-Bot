const db = require("../../db");

const ALLOWED_CASE_TYPES = ["mute", "kick", "ban", "warn"];

const getCaseStmt = db.prepare('SELECT * FROM cases WHERE caseNumber = ? AND guildId = ?');

const createOrUpdateCaseStmt = db.prepare(`
    INSERT INTO cases (caseNumber, userId, guildId, caseType, caseReason)
    VALUES (@caseNumber, @userId, @guildId, @caseType, @caseReason)
    ON CONFLICT(caseNumber, guildID) DO UPDATE SET
        userId = excluded.userId,
        guildId = excluded.guildId,
        caseType = excluded.caseType,
        caseReason = excluded.caseReason
    `)

const getNextCaseNumberStmt = db.prepare(`
    SELECT COALESCE(MAX(caseNumber), 0) + 1 AS next FROM cases WHERE guildId = ?
    `);

const updateCaseReasonStmt = db.prepare(`
    UPDATE cases SET caseReason = ? WHERE caseNumber = ? AND guildId = ?
    `)

const updateCaseTypeStmt = db.prepare(`
    UPDATE cases SET caseType = ? WHERE caseNumber = ? AND guildId = ?
    `)

module.exports = { 
    getCase(caseNumber, guildId){
        return getCaseStmt.get(caseNumber, guildId)
    },

    saveCase(data){
        if(!ALLOWED_CASE_TYPES.includes(data.caseType)){
            throw new Error(`Invalid case type ${data.caseType}`)
        }
        createOrUpdateCaseStmt.run(data)
    },

    getNextCaseNumber(guildId) {
        return getNextCaseNumberStmt.get(guildId).next;
    },

    updateCaseReason(caseNumber, text, guildId){
        updateCaseReasonStmt.run(text, caseNumber, guildId)
    },

    updateCaseType(caseNumber, reason, guildId){
        if(!ALLOWED_CASE_TYPES.includes(type)){
            throw new Error(`Invalid case type ${type}`)
        }
        updateCaseTypeStmt.run(reason, caseNumber, guildId)
    }

 }