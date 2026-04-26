const { ChatInputCommandInteraction, EmbedBuilder, GuildMember } = require('discord.js')
const userService = require("../DB/UserService")

module.exports = {
name: 'guildMemberAdd', // name
/**
 * 
 * @param {GuildMember} user 
 */
    async execute(user) {
        if(user.user.bot) return;

        const existing = userService.getUser(user.user.id)
        if(existing) return;

        userService.saveUser({
            userId: user.user.id,
            guildId: user.guild.id,
            level: 1,
            xp: 0,
            points: 0,
            invites: 0
        })

        console.log(`User added to DB: ${user.user.username}`)
    }
}