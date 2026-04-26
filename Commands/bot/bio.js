const { ChatInputCommandInteraction, SlashCommandBuilder, Events, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, Client, Guild, GuildMember, MessageFlags, PermissionFlagsBits,  } = require('discord.js')
const userService = require('../../Services/DB/UserService');
const roleLink = require('../../Services/DB/RoleLinkService');

module.exports = {
    subCommand: "bot.bio",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client, user){ 
        const bioDetails = interaction.options.getString("bio")

        const hasLinkedRole = interaction.hasLinkedRole;
        const isAdmin = interaction.isAdmin;


        if (!hasLinkedRole && !isAdmin) {
             return interaction.reply({
                content: "You need **Admin** to use this command",
                ephemeral: true
            });
        }

        interaction.guild.members.editMe({
            bio: bioDetails
        })

        await interaction.reply({
            content: `Updated my bio to ${bioDetails}`,
            flags: [MessageFlags.Ephemeral]
        })

    }
    
}