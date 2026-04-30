const { ChatInputCommandInteraction, PermissionFlagsBits, MessageFlags } = require("discord.js")
require('dotenv').config()
const roleLink = require("../DB/RoleLinkService")
const logIndex = require("../logTypes/logIndex")
const LoggingMnger = require("../Clients/loggingManger")
const channelService = require("../DB/channelService")

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction, client){
        if(interaction.isStringSelectMenu()){
            if (interaction.customId === "tglLogType"){
                const selected = interaction.values[0];
                const guildId = interaction.guild.id
                
                const row = channelService.getChannel(guildId)

                const settings = row?.logSettings ? JSON.parse(row.logSettings) : {}

                const currentlyEnabled = settings[selected] === true;

                settings[selected] = !currentlyEnabled;

                channelService.updateField(guildId, "logSettings", JSON.stringify(settings))
                LoggingMnger.refresh(guildId)

                return interaction.reply({
                    content: `${currentlyEnabled ? "🔴 Disabled" : "🟢 Enabled"} logging for **${selected}**`,
                    components: [],
                    flags: [MessageFlags.Ephemeral]
                })

            }
        }


        if(!interaction.isChatInputCommand()) return;

        const sub = interaction.options.getSubcommand(false);
        const fullCommand = sub ? `${interaction.commandName}.${sub}` : interaction.commandName;

        const allowedRoles = roleLink.getRoles(interaction.guild.id, fullCommand);
        const memberRoles = interaction.member.roles.cache;

        const hasLinkedRole = allowedRoles.some(roleId => memberRoles.has(roleId));
        const isAdmin = interaction.member.permissions.has(PermissionFlagsBits.Administrator);

        interaction.allowedRoles = allowedRoles;
        interaction.hasLinkedRole = hasLinkedRole;
        interaction.isAdmin = isAdmin;

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

        if (interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return runCommand(interaction, client);
        }

        if (allowedRoles.length > 0) {
            if (!hasLinkedRole && !isAdmin) {
                return interaction.reply({
                    content: "No permission to use this command",
                    ephemeral: true
                });
        }
        }

        else{
            if (!isAdmin){
                return interaction.reply({
                    content: "You need the **Admin** permission to use this command",
                    ephemeral: true
                });
            }
        }

    return runCommand(interaction, client);


    function runCommand(interaction, client) {
        const isSubCMD = interaction.options.getSubcommand(false);

        if (isSubCMD) {
            const subCMDFile = client.subCommands.get(`${interaction.commandName}.${isSubCMD}`);

            if (!subCMDFile) {
                return interaction.reply({
                    content: 'This subCommand is outdated',
                    ephemeral: true
            });
        }

        return subCMDFile.execute(interaction, client);
    }

    return command.execute(interaction, client);
        }
    }
}