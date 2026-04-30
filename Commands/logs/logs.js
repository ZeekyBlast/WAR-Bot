const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("logs")
    .setDescription("Enables logging for certain events")
    .addSubcommand((option) => option
    .setName("enable")
    .setDescription("enables certain logging events")
    )
}