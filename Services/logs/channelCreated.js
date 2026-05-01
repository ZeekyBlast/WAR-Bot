const { EmbedBuilder, Colors, GuildChannel } = require("discord.js");
const loggingManger = require("../Clients/loggingManger");

module.exports = {
    name: "channelCreate",

    async execute(channel){
        if(!channel.guild) return

        const embed = new EmbedBuilder()
            .setColor(Colors.DarkRed)
            .setTitle("Channel Created")
            .setDescription(`**${channel.name}** Created`)
            .setTimestamp()
            .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })

        loggingManger.log(channel.guild, "chnlCreated", embed)
    }
}