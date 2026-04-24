const { ChatInputCommandInteraction, SlashCommandBuilder, Events, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, Client, Guild, GuildMember,  } = require('discord.js')


module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("For testing shit"),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     * @param {GuildMember} user 
     * 
     * 
     */
     
    async execute(interaction, client, user){ 

       interaction.reply("WORKS")


    }
    
}