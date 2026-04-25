const { loadCMDS } = require('../../Handlers/commandHandler')
const userService = require('../DB/UserService')
const { PresenceUpdateStatus, ActivityType } = require('discord.js')
const { ChatInputCommandInteraction, EmbedBuilder, GuildMember, Message } = require('discord.js')

module.exports = {
    name: 'messageCreate', // name
    /**
     * 
     * @param {Message} message
     * 
     */
    async execute(message) { //anything in the () is something that isn't basic js so if you need the client which is the bot you put it in there
        
        if(message.author.bot) return

        const userData = userService.getUser(message.member.id);


        if (!userData){
            return;
        }
        
        const newXP = userData.xp + 1

        userService.saveUser({
            userId: message.member.id,
            level: userData.level,
            xp: newXP,
            points: userData.points
        })

    }
}