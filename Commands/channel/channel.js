const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("channel")
    .setDescription("updates channels for welcome, invites and logs ")
    .addSubcommand((option) => option
    .setName("set")
    .setDescription("Sets the channel")
    .addStringOption((option) => option
        .setName("option")
        .setRequired(true)
        .setDescription("What option to update")
        .setChoices(
            { name: 'welcome', value: 'opt_welcome' },
            { name: 'logs', value: 'opt_logs' },
            { name: 'invites', value: 'opt_invites' },
        )
    )
    .addChannelOption((option) => option
        .setName("channel")
        .setRequired(true)
        .setDescription("what channel to set to")
    )
    )

}