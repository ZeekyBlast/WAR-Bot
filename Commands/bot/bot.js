const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("bot")
    .setDescription("Commands related to the bot")
    .addSubcommand((option) => option
    .setName("nickname")
    .setDescription("Nickname of the bot")
    .addStringOption((option) => option
        .setName("name")
        .setRequired(true)
        .setDescription("New nickname")
    )
    )
    .addSubcommand((option) => option
    .setName("banner")
    .setDescription("Banner of the bot")
    .addStringOption((option) => option
        .setName("image")
        .setRequired(true)
        .setDescription("New banner")
    )
    )
    .addSubcommand((option) => option
    .setName("profile")
    .setDescription("Profile of the bot")
    .addStringOption((option) => option
        .setName("image")
        .setRequired(true)
        .setDescription("New image")
    )
    )
    .addSubcommand((option) => option
    .setName("bio")
    .setDescription("Bio of the bot")
    .addStringOption((option) => option
        .setName("bio")
        .setRequired(true)
        .setDescription("New bio")
    )
    )
}