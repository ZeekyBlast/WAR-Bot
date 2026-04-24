const { ChatInputCommandInteraction, SlashCommandBuilder, Events, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, Client, Guild, GuildMember, MessageFlags, PermissionFlagsBits,  } = require('discord.js')
const userService = require('../../Services/DB/UserService');
const roleLink = require('../../Services/DB/RoleLinkService');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("level")
    .addUserOption((option) => option
        .setName("target")
        .setDescription("Level of user")
        .setRequired(false)
    )
    .setDescription("For testing shit"),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     * 
     * 
     */
     
    async execute(interaction, client){ 
        const user = interaction.user.id
        const target = interaction.options.getUser('target')

        if(!target){
            const userLevel = userService.getUser(user)

            if(!userLevel) {
                interaction.reply({
                   content: `${interaction.user.username} Unable to locate DB`,
                   flags: [MessageFlags.Ephemeral]
                })
            }

            interaction.reply(`Level: ${userLevel.level}, XP: ${userLevel.xp}`)
        }else{
            const targetLevel = userService.getUser(target.id)

            interaction.reply(`Level: ${targetLevel.level}, XP: ${targetLevel.xp}`)
        }
    }
    
}