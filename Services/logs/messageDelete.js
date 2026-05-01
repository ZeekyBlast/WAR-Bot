const { EmbedBuilder, Colors } = require("discord.js");
const loggingManger = require("../Clients/loggingManger");

module.exports = {
    name: "messageDelete",

    async execute(message){
        if(!message.guild) return

        const username = message.author?.username || "Unknown User";
        const avatar = message.author?.displayAvatarURL?.() || null;
        const content = message.content || "*Message content unavailable*";

        const embed = new EmbedBuilder()
            .setColor(Colors.DarkRed)
            .setTitle("Message Deleted")
            .setDescription(message.content || "*no content*")
            .setTimestamp()
            .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })

        loggingManger.log(message.guild, "msgDeleted", embed)
    }
}