const { EmbedBuilder, Colors } = require("discord.js");
const loggingManger = require("../Clients/loggingManger");

module.exports = {
    name: "messageDelete",

    async execute(message){
        if(!message.guild) return

        const embed = new EmbedBuilder()
            .setColor(Colors.DarkRed)
            .setTitle("Message Deleted")
            .setDescription(message.content || "*no content*")
            .setTimestamp()
            .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })

        loggingManger.log(message.guild, "msgDeleted", embed)
    }
}