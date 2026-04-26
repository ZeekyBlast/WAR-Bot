const { loadCMDS } = require('../../Handlers/commandHandler')
const userService = require('../DB/UserService')
const { PresenceUpdateStatus, ActivityType } = require('discord.js')

module.exports = {
    name: 'clientReady', // name
    once: true, //if it happens more then once
    async execute(client) { //anything in the () is something that isn't basic js so if you need the client which is the bot you put it in there
        client.user.setPresence({ activities: [{ name: 'Be my zombie', type: ActivityType.Listening }] });

        for (const [guildId, guild] of client.guilds.cache){
            await guild.members.fetch();

            guild.members.cache.forEach(member => {
                if (member.user.bot) return;

                const existing = userService.getUser(member.id, guild.id);

                if(!existing){
                    userService.saveUser({
                        userId: member.id,
                        guildId: guild.id,
                        level: 1,
                        xp: 0,
                        points: 0,
                        invites: 0
                    })

                    console.log(`Added new user to DB: ${member.user.tag}`);
                }
            })
        }

        loadCMDS(client);
        console.log(`${client.user.username} is now ready`)
    }
}