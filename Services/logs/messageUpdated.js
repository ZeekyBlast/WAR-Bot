const { EmbedBuilder, Colors, GuildChannel } = require("discord.js");
const loggingManger = require("../Clients/loggingManger");

module.exports = {
    name: "messageUpdate",

    async execute(oldMessage, newMessage) {
        if(oldMessage.author.bot) return;
            if(oldMessage !== newMessage){
                const embed = new EmbedBuilder()
                    .setColor(Colors.DarkRed)
                    .setTitle("Message Edited")
                    .setURL(newMessage.url)
                    .setDescription(`**Before:** ${oldMessage}\n**After:** ${newMessage}`)
                    .setThumbnail(newMessage.author.displayAvatarURL({ size: 1024 }))
                    .setTimestamp()
                    .setAuthor({
                        name: newMessage.author.username,
                        iconURL: newMessage.author.displayAvatarURL()
                    });

                loggingManger.log(newMessage.guild, "msgEdited", embed);
            }
        }
    }