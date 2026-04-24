const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("level")
    .setDescription("Reloads commands")
    .addSubcommand((option) => option
    .setName("member")
    .setDescription("Level of member")
    .addUserOption((option) => option
        .setName("target")
        .setDescription("Level of user")
        .setRequired(false)
    )
    )
    .addSubcommand((option) => option
    .setName("addlevel")
    .setDescription("Adds levels to a member")
    )
}