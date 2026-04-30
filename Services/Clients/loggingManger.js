const { EmbedBuilder } = require("discord.js");
const chnlService = require('../DB/channelService')

class LoggingManger {
    constructor(){
        this.cache = new Map()
    }

    getSettings(guildId){
        if (this.cache.has(guildId)){
            return this.cache.get(guildId)
        }

        const row = chnlService.getChannel(guildId)
        if(!row) return null
        
        const settings = {
            logsChannel: row.logs,
            logSettings: row.logSettings ? JSON.parse(row.logSettings) : {}
        }

        this.cache.set(guildId, settings)
        return settings
    }   

    refresh(guildId) {
        this.cache.delete(guildId)
    }

    async log (guild, type, embedOrText){
        const settings = this.getSettings(guild.id)
        if(!settings) return

        if (!settings.logSettings[type]) return;

        const channel = guild.channels.cache.get(settings.logsChannel)
        if(!channel) return

        if(embedOrText instanceof EmbedBuilder){
            channel.send({ embeds: [embedOrText] })
        } else {
            channel.send(embedOrText)
        }
    }
}

module.exports = new LoggingManger()