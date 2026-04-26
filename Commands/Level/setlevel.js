const { ChatInputCommandInteraction, SlashCommandBuilder, Events, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, Client, Guild, GuildMember, MessageFlags, PermissionFlagsBits,  } = require('discord.js')
const userService = require('../../Services/DB/UserService');
const roleLink = require('../../Services/DB/RoleLinkService');

module.exports = {
    subCommand: "level.setlevel",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client, user){ 

        const target = interaction.options.getUser('target')
        const amount = interaction.options.getNumber('level')

        if (interaction.member.permissions.has(PermissionFlagsBits.ManageMessages) && !hasLinkedRole && !isAdmin) {
             return interaction.reply({
                content: "You need **ManageMessages** to use this command",
                ephemeral: true
            });
        }

        if (!userData){
            return;
        }

        const userData = userService.getUser(target.id, interaction.guild.id);

        if (!userData){
            return;
        }

        const newLevel = userData.level = amount

        userService.saveUser({
            userId: target.id,
            guildId: userData.guildId,
            level: newLevel,
            xp: userData.xp,
            points: userData.points,
            invites: userData.invites
        })

        interaction.reply({
            content: `✅ Set **${amount}** levels to **${target.username}** (Total: **${newLevel}**) `
        })

    }
    
}