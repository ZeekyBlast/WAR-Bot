const { ChatInputCommandInteraction, SlashCommandBuilder, Events, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, Client, Guild, GuildMember, MessageFlags, PermissionFlagsBits, EmbedBuilder, Colors,  } = require('discord.js')
const userService = require('../../Services/DB/UserService');
const roleLink = require('../../Services/DB/RoleLinkService');

module.exports = {
    subCommand: "level.member",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
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

            let userEmbed = new EmbedBuilder()
            .setDescription(`
                **Level**: ${userLevel.level}\n
                **XP**: ${userLevel.xp}\n
                **Points**: ${userLevel.points}  
            `)
            .setFooter({
                text: `${interaction.user.username}`,
                iconURL: interaction.user.avatarURL()
            })
            .setThumbnail(interaction.user.avatarURL())
            .setColor(Colors.Gold)

            await interaction.reply({ embeds: [userEmbed] }).then(() => setTimeout (() => interaction.deleteReply(), 20000))
        }else{
            const targetLevel = userService.getUser(target.id)

            let targetEmbed = new EmbedBuilder()
            .setColor(Colors.Gold)
            .setDescription(`
                **Level**: ${targetLevel.level}\n
                **XP**: ${targetLevel.xp}\n
                **Points**: ${targetLevel.points}  
            `)
            .setFooter({
                text: `${target.username}`,
                iconURL: target.avatarURL()
            })
            .setThumbnail(target.avatarURL())

            await interaction.reply({ embeds: [targetEmbed] }).then(() => setTimeout (() => interaction.deleteReply(), 20000))
        }
    }
    
}