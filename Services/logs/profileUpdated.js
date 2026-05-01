const { EmbedBuilder, Colors, GuildChannel } = require("discord.js");
const loggingManger = require("../Clients/loggingManger");

module.exports = {
    name: "userUpdate",

    async execute(oldUser, newUser) {
        for (const [guildId, guild] of newUser.client.guilds.cache) {

            const member = guild.members.cache.get(newUser.id);
            if (!member) continue;
            if (oldUser.avatar !== newUser.avatar) {
                const embed = new EmbedBuilder()
                    .setColor(Colors.DarkRed)
                    .setTitle("Profile Updated")
                    .setDescription(`**${newUser.username}** updated their profile picture`)
                    .setThumbnail(newUser.displayAvatarURL({ size: 1024 }))
                    .setTimestamp()
                    .setAuthor({
                        name: newUser.username,
                        iconURL: newUser.displayAvatarURL()
                    });

                loggingManger.log(guild, "prfUpdated", embed);
            }
        }
    }
}