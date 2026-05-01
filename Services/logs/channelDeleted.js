const { EmbedBuilder, Colors, GuildChannel } = require("discord.js");
const loggingManger = require("../Clients/loggingManger");

module.exports = {
    name: "channelDelete",

    async execute(channel){
        if(!channel.guild) return

        const embed = new EmbedBuilder()
            .setColor(Colors.DarkRed)
            .setTitle("Channel Deleted")
            .setDescription(`**${channel.name}** Deleted`)
            .setTimestamp()
            .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })

        loggingManger.log(channel.guild, "chnlDeleted", embed)
    }
}