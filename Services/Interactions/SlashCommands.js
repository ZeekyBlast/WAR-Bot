const { ChatInputCommandInteraction } = require("discord.js")
require('dotenv').config()
const roleLink = require("../DB/RoleLinkService")

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction, client){
        if(!interaction.isChatInputCommand()) return;
        const allowedRoles = roleLink.getRoles(interaction.guild.id, `${interaction.commandName}`)

        const command = client.cmds.get(interaction.commandName)
        if(!command) return interaction.reply({
            content: 'This command is outdated',
            ephemeral: true //makes the command only visible to the sender
        });

        if(command.developer && interaction.user.id !== `${process.env.BOTDEV}`)
        return interaction.reply({
            content: "This command is only avaible to the bot's developers if this is a mistake contact me here on discord: zeekyblast",
            ephemeral: true
        });

        if(command.owner && interaction.user.id !== `${process.env.OWNER}`)
        return interaction.reply({
            content: "This command is only avaible to the bot's owner if this is a mistake contact me here on discord: zeekyblast",
            ephemeral: true
        });

        if(allowedRoles.length > 0){
            const memberRoles = interaction.member.roles.cache;

            const hasPermission = allowedRoles.some(roleId => memberRoles.has(roleId))

            if(!hasPermission){
                return interaction.reply({
                    content: "No permission to use this command",
                    ephemeral: true
                })
            }
        }

        const isSubCMD = interaction.options.getSubcommand(false);
        if(isSubCMD) {
            const subCMDFile = client.subCommands.get(`${interaction.commandName}.${isSubCMD}`)
            if(!subCMDFile) return interaction.reply({
                content: 'This subCommand is outdated',
                ephemeral: true //makes the command only visible to the sender
            });
            subCMDFile.execute(interaction, client);
        } else command.execute(interaction, client);
    }
}