const { loadCMDS } = require('../../Handlers/commandHandler')
const userService = require('../DB/UserService')
const { PresenceUpdateStatus, ActivityType } = require('discord.js')
const { getGuildInv } = require('../Invites/inviteCache')

module.exports = {
    name: 'inviteCreate', // name
    async execute(invite) { //anything in the () is something that isn't basic js so if you need the client which is the bot you put it in there
        const guildInv = getGuildInv(invite.guild.id);

        guildInv.set(invite.code, invite.uses);
        
        console.log(invite.guild.id)
    }
}