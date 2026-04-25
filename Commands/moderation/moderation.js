const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("moderation")
    .setDescription("moderation commands")
    .addSubcommand((option) => option
    .setName("caseview")
    .setDescription("view case file")
    .addUserOption((option) => option
        .setName("target")
        .setDescription("target")
        .setRequired(true)
    )
)
    .addSubcommand((option) => option
    .setName("updatecase")
    .setDescription("updates case file")
    .addStringOption((option) => option
        .setName("casetype")
        .setDescription("what type of case")
        .setRequired(false)
        .addChoices(
            { name: 'kick', value: 'case_kick' },
            { name: 'ban', value: 'case_ban' },
            { name: 'mute', value: 'case_mute' },
            { name: 'warn', value: 'case_warn' }
        ) 
    )
    .addStringOption((option) => option
        .setName("casereason")
        .setDescription("updates case reason")
        .setRequired(false)
    )
    )
    .addSubcommand((option) => option
    .setName("ban")
    .setDescription("bans a member")
    .addUserOption((option) => option
        .setName("target")
        .setDescription("ban target")
        .setRequired(true)
    )
    .addStringOption((option) => option
        .setName("reason")
        .setDescription("Reason for ban")
        .setRequired(false)
    )
    .addStringOption((option) => option
        .setName("time")
        .setDescription("Length of time to ban")
        .setRequired(false)
    )
    )
}