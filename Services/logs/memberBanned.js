const { EmbedBuilder, Colors, GuildChannel } = require("discord.js");
const loggingManger = require("../Clients/loggingManger");

module.exports = {
    name: "guildBanAdd",

    async execute(ban){
        const { guild, user } = ban;

        const embed = new EmbedBuilder()
            .setColor(Colors.DarkRed)
            .setTitle("User Banned")
            .setDescription(`**User:** ${user.username}`)
            .setTimestamp()
            .setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })

        loggingManger.log(guild, "mmbBanned", embed)
    }
}