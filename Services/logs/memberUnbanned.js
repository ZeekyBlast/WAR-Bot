const { EmbedBuilder, Colors, GuildChannel } = require("discord.js");
const loggingManger = require("../Clients/loggingManger");

module.exports = {
    name: "guildBanRemove",

    async execute(ban){
        const { guild, user } = ban;

        const embed = new EmbedBuilder()
            .setColor(Colors.DarkRed)
            .setTitle("User Unbanned")
            .setDescription(`**${user.username}** was unbanned`)
            .setTimestamp()
            .setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })

        loggingManger.log(guild, "mmbUnbanned", embed)
    }
}