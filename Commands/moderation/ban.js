const { ChatInputCommandInteraction, SlashCommandBuilder, Events, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, Client, Guild, GuildMember, MessageFlags, PermissionFlagsBits, EmbedBuilder, Colors, AttachmentBuilder, ALLOWED_EXTENSIONS  } = require('discord.js')
const caseLink = require('../../Services/DB/caseLinkService')
const parseDuration = require("../../Services/DB/timeParser")
const roleLink = require("../../Services/DB/RoleLinkService")

module.exports = {
    subCommand: "moderation.ban",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client){ 
        const user = interaction.options.getMember("target")
        const time = interaction.options.getString("time")
        const reason = interaction.options.getString("reason")
        const guildId = interaction.guild.id;
        const caseNumber = caseLink.getNextCaseNumber(guildId);

        const hasLinkedRole = interaction.hasLinkedRole;
        const isAdmin = interaction.isAdmin;


        if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers) && !hasLinkedRole && !isAdmin) {
             return interaction.reply({
                content: "You need **Ban Members** to use this command",
                ephemeral: true
            });
        }

        if(user.bot) return;
        if(!user.bannable) return;

        let caseReason = reason || "No reason given"

        if(!time){ 
            
            interaction.guild.members.ban(user, {reason: caseReason})

            await caseLink.saveCase({
                caseNumber,
                userId: user.id,
                guildId,
                caseType: 'ban',
                caseReason: caseReason
            })

            interaction.reply({
                content: `${user.id} has been banned for ${caseReason}, case number: ${caseNumber}`
            })
            return
        }

        const timeMs = parseDuration(time)

        if(!timeMs){
            interaction.reply({
                content: "Invalid duration. Use formats like `10s`, `5m`, `2h`, `1d`.",
                flags: [MessageFlags.Ephemeral]
            })
        }

        await interaction.guild.members.ban(user, {
            reason: caseReason
        })

        setTimeout(async () => {
            await interaction.guild.members.unban(user.id);
        }, timeMs)

        caseLink.saveCase({
            caseNumber,
            userId: user.id,
            guildId,
            caseType: 'ban',
            caseReason: caseReason
        })

        interaction.reply({
            content: `${user.id} has been banned for ${caseReason}, case number: ${caseNumber}, Time ${timeMs} in ms`
        })
    }
 }