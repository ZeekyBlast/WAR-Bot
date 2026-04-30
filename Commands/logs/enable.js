const { ActionRowBuilder, StringSelectMenuBuilder, PermissionFlagsBits, Client, ChatInputCommandInteraction, MessageFlags } = require("discord.js");
const LogTypes = require('../../Services/logTypes/logIndex')
const chnlService = require('../../Services/DB/channelService')

module.exports = {
    subCommand: 'logs.enable',
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction){
        const hasLinkedRole = interaction.hasLinkedRole;
        const isAdmin = interaction.isAdmin;

        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild) && !hasLinkedRole && !isAdmin) {
             return interaction.reply({
                content: "You need **Manage Guild** to use this command",
                ephemeral: true
            });
        }

        const chnl = chnlService.getChannel(interaction.guild.id)

        if(!chnl || !chnl.logs) return interaction.reply({
            content: `Please add a **Logs** channel.`,
            flags: [MessageFlags.Ephemeral]
        })

        const options = Object.entries(LogTypes).map(([key, value]) => ({
            label: key.replace(/_/g, " ").toLocaleLowerCase(),
            value
        }))

        const menu = new StringSelectMenuBuilder()
        .setCustomId('tglLogType')
        .setPlaceholder('Select a logging type to toggle')
        .addOptions(options)

        const row = new ActionRowBuilder().addComponents(menu);

        return interaction.reply({
            content: 'Choose a logging type to toggle:',
            components: [row],
            flags: [MessageFlags.Ephemeral]
        })
    }
}