const { ChatInputCommandInteraction, SlashCommandBuilder, Events, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, Client, Guild, GuildMember, MessageFlags, PermissionFlagsBits, EmbedBuilder, Colors, AttachmentBuilder, ALLOWED_EXTENSIONS  } = require('discord.js')
const chnlService = require("../../Services/DB/channelService")

module.exports = {
    subCommand: "channel.set",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client){
        const chnl = interaction.options.getChannel("channel")
        const option = interaction.options.getString("option")

        const hasLinkedRole = interaction.hasLinkedRole;
        const isAdmin = interaction.isAdmin;

        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageChannels) && !isAdmin && !hasLinkedRole){
             return interaction.reply({
                content: "You need **Manage Channels** to use this command",
                ephemeral: true
            });
        }

        
        
        if(option === "opt_invites"){
            const chnlId = chnl.id

            const existing = chnlService.getChannel(interaction.guild.id)

            if(!existing){
                chnlService.saveChnl({
                    guildId: interaction.guild.id,
                    logs: null,
                    welcome: null,
                    invites: chnlId,
                    logSettings: "{}"
                })
            }else {
                chnlService.updateField(interaction.guild.id, "invites", chnlId)
            }
            return interaction.reply({
                content: `✅ Set **${chnl.name}** to log **Invites**`,
                ephemeral: true
            })
        }

        if(option === "opt_logs"){
            const chnlId = chnl.id

            const existing = chnlService.getChannel(interaction.guild.id)

            if(!existing){
                chnlService.saveChnl({
                    guildId: interaction.guild.id,
                    logs: chnlId,
                    welcome: null,
                    invites: null,
                    logSettings: "{}"
                })
            }else{
                chnlService.updateField(interaction.guild.id, "logs", chnlId)
            }
            return interaction.reply({
                content: `✅ Set **${chnl.name}** to log **Logs**`,
                ephemeral: true
            })
        }

    }
}