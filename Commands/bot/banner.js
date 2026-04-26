const { ChatInputCommandInteraction, SlashCommandBuilder, Events, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, Client, Guild, GuildMember, MessageFlags, PermissionFlagsBits,  } = require('discord.js')
const userService = require('../../Services/DB/UserService');
const roleLink = require('../../Services/DB/RoleLinkService');

module.exports = {
    subCommand: "bot.banner",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client, user){ 
        const bannerIMG = interaction.options.getString("image")

        const hasLinkedRole = interaction.hasLinkedRole;
        const isAdmin = interaction.isAdmin;


        if (!hasLinkedRole && !isAdmin) {
             return interaction.reply({
                content: "You need **Admin** to use this command",
                ephemeral: true
            });
        }

        const imageRegex = /https?:\/\/.*\.(png|jpg|jpeg|gif|webp)(?:\?.*)?$/i

        if(imageRegex.test(bannerIMG)) {
            interaction.guild.members.editMe({
                banner: bannerIMG
            })

            await interaction.reply({
                content: `Updated my banner`,
                flags: [MessageFlags.Ephemeral]
            })
        }else{
            interaction.reply({
                content: `Not a valid image url`,
                flags: [MessageFlags.Ephemeral]
            })
        }

    }
    
}