const { loadCMDS } = require('../../Handlers/commandHandler')
const userService = require('../DB/UserService')
const { PresenceUpdateStatus, ActivityType, Collection } = require('discord.js')
const { ChatInputCommandInteraction, EmbedBuilder, GuildMember, Message } = require('discord.js')
const { addXPAndCheckLevel } = require('../DB/levelService')
const { calcRequiredXP } = require('../DB/mathService')

let cooldowns = new Collection()

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

        const cooldownAmount = 60000
        const now = Date.now()

        if (cooldowns.has(message.author.id)){
            const expiration = cooldowns.get(message.author.id) + cooldownAmount

            if (now < expiration){
                const timeLeft = (expiration - now) / 1000
                return;
            }
        }

        cooldowns.set(message.author.id, now)

        setTimeout(() => cooldowns.delete(message.author.id), cooldownAmount)

        const userId = message.author.id;
        const guildId = message.guild.id;

        const result = await addXPAndCheckLevel(userId, guildId, 5);


        if(result?.leveledUp){
            message.channel.send({
                content: `🎉 **${message.author.username}** leveled up to **${result.level}**!`
            }).then(() => setTimeout (() => message.delete(), 20000))
        }

    }
}