const guildInvites = new Map();

function getGuildInv(guildId) {
    if (!guildInvites.has(guildId)) {
        guildInvites.set(guildId, new Map());
    }
    return guildInvites.get(guildId);
}

function updateGuildInv(guildId, inviteArray) {
    const map = new Map();

    for (const inv of inviteArray) {
        map.set(inv.code, inv.uses);
    }

    guildInvites.set(guildId, map);
}

module.exports = { getGuildInv, updateGuildInv };
