const { ChatInputCommandInteraction, SlashCommandBuilder, Events, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, Client, Guild, GuildMember, MessageFlags, PermissionFlagsBits, EmbedBuilder, Colors, AttachmentBuilder, ALLOWED_EXTENSIONS  } = require('discord.js')
const caseLink = require('../../Services/DB/caseLinkService')

module.exports = {
    subCommand: "moderation.casecreate",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client){ 

        const user = interaction.options.getUser('target')
        const type = interaction.options.getString('casetype')
        const reason = interaction.options.getString('casereason')
        const guildId = interaction.guild.id

        const caseNumber = caseLink.getNextCaseNumber(guildId)

        caseLink.saveCase({
            caseNumber,
            userId: user.id,
            guildId,
            caseType: type,
            caseReason: reason
        })

        const caseEmbed = new EmbedBuilder()
        .addFields([
            { name: "User", value: `<@${user.id}>`, inline: true },
            { name: "Type", value: type, inline: true },
            { name: "Reason", value: reason }
        ])
        .setTitle(`Case ${caseNumber} Created`)

        await interaction.reply({ embeds: [caseEmbed] })
    }
 }