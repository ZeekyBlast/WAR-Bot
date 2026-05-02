const { EmbedBuilder, Colors, GuildChannel } = require("discord.js");
const loggingManger = require("../Clients/loggingManger");

module.exports = {
    name: "guildMemberRemove",

    async execute(member){

        const embed = new EmbedBuilder()
            .setColor(Colors.DarkRed)
            .setTitle("User Kicked")
            .setDescription(`**User:** ${member.username}`)
            .setTimestamp()
            .setAuthor({ name: member.username, iconURL: member.displayAvatarURL() })

        loggingManger.log(guild, "mmbKicked", embed)
    }
}