const { loadCMDS } = require('../../Handlers/commandHandler')
const userService = require('../DB/UserService')
const { PresenceUpdateStatus, ActivityType } = require('discord.js')
const { ChatInputCommandInteraction, EmbedBuilder, GuildMember, Message } = require('discord.js')
const { addXPAndCheckLevel } = require('../DB/levelService')
const { calcRequiredXP } = require('../DB/mathService')

module.exports = {
    name: 'messageCreate', // name
    /**
     * 
     * @param {Message} message
     * @param {ChatInputCommandInteraction} interaction
     * 
     */
    async execute(message, interaction) { //anything in the () is something that isn't basic js so if you need the client which is the bot you put it in there

        if(message.author.bot) return;

        const userId = message.author.id;

        const result = await addXPAndCheckLevel(userId, 5);


        if(result?.leveledUp){
            message.channel.send({
                content: `🎉 **${message.author.username}** leveled up to **${result.level}**!`
            }).then(() => setTimeout (() => message.delete(), 20000))
        }

    }
}