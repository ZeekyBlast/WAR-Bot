const { ChatInputCommandInteraction, SlashCommandBuilder, Events, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, Client, Guild, GuildMember, PermissionFlagsBits, MessageFlags  } = require('discord.js')
const roleLink = require("../../Services/DB/RoleLinkService")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("unlink")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) => option
        .setName("command")
        .setDescription("Command name to unlink")
        .setRequired(true)
    )
    .addRoleOption((option) => option
        .setName("role")
        .setDescription("Role allowed to use the command")
        .setRequired(true)
    )
    .setDescription("Unlinks a command from a role."),
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
        let command = client.cmds.get(commandRun)

        if(!command){
            command = client.subCommands.get(commandRun);
        }

        if (!command) {
        return interaction.reply({
            content: `❌ The command **/${commandRun}** does not exist.`,
            ephemeral: true
            });
        }       
        
        const linkedRoles = roleLink.getRoles(
            interaction.guild.id,
            commandRun
        )

        if(!linkedRoles.includes(role.id)){
            return interaction.reply({
                content: `⚠️ The role **${role.name}** is not linked to **/${commandRun}**.`,
                flags: [MessageFlags.Ephemeral]
            })
        }
        
        roleLink.unlinkRole(
            interaction.guild.id,
            commandRun,
            role.id
        )

        await interaction.reply(`🔓 Unlinked **${role.name}** from **/${commandName}**`)
    }
}