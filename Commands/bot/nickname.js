const { ChatInputCommandInteraction, SlashCommandBuilder, Events, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, Client, Guild, GuildMember, MessageFlags, PermissionFlagsBits,  } = require('discord.js')
const userService = require('../../Services/DB/UserService');
const roleLink = require('../../Services/DB/RoleLinkService');

module.exports = {
    subCommand: "bot.nickname",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client, user){ 
        const nickname = interaction.options.getString("name")

        const hasLinkedRole = interaction.hasLinkedRole;
        const isAdmin = interaction.isAdmin;


        if (!hasLinkedRole && !isAdmin) {
             return interaction.reply({
                content: "You need **Ban Members** to use this command",
                ephemeral: true
            });
        }

        interaction.guild.members.editMe({
            nick: nickname
        })

        await interaction.reply({
            content: `Updated my name to ${nickname}`,
            flags: [MessageFlags.Ephemeral]
        })

    }
    
}