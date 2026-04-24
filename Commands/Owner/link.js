const { ChatInputCommandInteraction, SlashCommandBuilder, Events, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, Client, Guild, GuildMember, PermissionFlagsBits,  } = require('discord.js')
const roleLink = require("../../Services/DB/RoleLinkService")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("link")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) => option
        .setName("command")
        .setDescription("Command name to restrict")
        .setRequired(true)
    )
    .addRoleOption((option) => option
        .setName("role")
        .setDescription("Role allowed to use the command")
        .setRequired(true)
    )
    .setDescription("Links a command to a role."),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     * @param {GuildMember} user 
     * 
     * 
     */
     
    async execute(interaction, client, user){ 
        const commandRun = interaction.options.getString("command")
        const role = interaction.options.getRole("role")
        const command = client.cmds.get(commandRun)
        if (!command) {
        return interaction.reply({
            content: `❌ The command **/${commandRun}** does not exist.`,
            ephemeral: true
            });
        }       
        
        roleLink.linkRole(
            interaction.guild.id,
            commandRun,
            role.id
        )

        await interaction.reply({
            content: `Linked **${role.name}** to **${commandRun}**`,
            ephemeral: true
        })
    
    }
}