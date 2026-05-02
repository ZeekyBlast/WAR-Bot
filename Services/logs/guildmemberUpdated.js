const { EmbedBuilder, Colors, GuildChannel } = require("discord.js");
const loggingManger = require("../Clients/loggingManger");
const formatDuration = require("../DB/formatDuration")

module.exports = {
    name: "guildMemberUpdate",

    async execute(oldMember, newMember) {
        const oldTimeout = oldMember.communicationDisabledUntil;
        const newTimeout = newMember.communicationDisabledUntil
        const oldNick = oldMember.nickname;
        const newNick = newMember.nickname;

            if (!oldTimeout && newTimeout) {
                const remaining = newTimeout - Date.now();
                const formatted = formatDuration(remaining);
                const embed = new EmbedBuilder()
                    .setColor(Colors.DarkRed)
                    .setTitle("Member Timed Out")
                    .setDescription(`**User:** ${newMember.user.tag}\n**Time:** ${formatted}`)
                    .setThumbnail(newMember.user.displayAvatarURL({ size: 1024 }))
                    .setTimestamp()
                    .setAuthor({
                        name: newMember.user.username,
                        iconURL: newMember.user.displayAvatarURL()
                    });

                loggingManger.log(newMember.guild, "mmbTimeout", embed);
            }

            if (oldTimeout && !newTimeout) {
                    const embed = new EmbedBuilder()
                    .setColor(Colors.DarkRed)
                    .setTitle("Member Timeout Removed")
                    .setDescription(`**User:** ${newMember.user.tag}`)
                    .setThumbnail(newMember.user.displayAvatarURL({ size: 1024 }))
                    .setTimestamp()
                    .setAuthor({
                        name: newMember.user.username,
                        iconURL: newMember.user.displayAvatarURL()
                    });

                loggingManger.log(newMember.guild, "tmtRemoved", embed);
            }

            if(oldNick !== newNick){
                const embed = new EmbedBuilder()
                    .setColor(Colors.DarkRed)
                    .setTitle("Member Nickname Updated")
                    .setDescription(
                        `**${oldNick ?? "None"}** → **${newNick ?? "None"}**`
                    )
                    .setTimestamp()
                    .setAuthor({
                        name: newMember.user.username,
                        iconURL: newMember.user.displayAvatarURL()
                    });

                loggingManger.log(newMember.guild, "mmbNicked", embed);
            }
    }
}