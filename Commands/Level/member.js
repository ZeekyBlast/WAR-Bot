const { ChatInputCommandInteraction, SlashCommandBuilder, Events, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, Client, Guild, GuildMember, MessageFlags, PermissionFlagsBits, EmbedBuilder, Colors, AttachmentBuilder, ALLOWED_EXTENSIONS  } = require('discord.js')
const userService = require('../../Services/DB/UserService');
const roleLink = require('../../Services/DB/RoleLinkService');
const { Rank } = require('canvacord')
const { calcRequiredXP } = require('../../Services/DB/mathService')

module.exports = {
    subCommand: "level.member",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client){ 
        const user = interaction.user.id
        const target = interaction.options.getUser('target')

        if(!target){
            const userLevel = userService.getUser(user, interaction.guild.id)

            if(!userLevel) {
                interaction.reply({
                   content: `${interaction.user.username} Unable to locate DB`,
                   flags: [MessageFlags.Ephemeral]
                })
            }

            const required = calcRequiredXP(userLevel.level)
            const { rank, total } = userService.getUserRank(user, interaction.guild.id)

            const card = new Rank()
                .setAvatar(interaction.user.avatarURL({ extension: 'png' }))
                .setCurrentXP(userLevel.xp)
                .setRequiredXP(required)
                .setLevel(userLevel.level)
                .setUsername(interaction.user.username)
                .setBackground(`IMAGE`, "https://i.pinimg.com/736x/03/23/ad/0323ad804e005bb1ed5b8f694bb5c6a9.jpg")
                .setRank(rank)

            const img = await card.build();
            const attachmentUser = new AttachmentBuilder(img, { name: "rank.png" }) 

            return interaction.reply({ files: [attachmentUser] }).then(() => setTimeout (() => interaction.deleteReply(), 20000))
        }
        const targetLevel = userService.getUser(target.id, interaction.guild.id);

            if (!targetLevel) {
                return interaction.reply({
                    content: `${target.username} has no XP data.`,
                    flags: [MessageFlags.Ephemeral]
                });
            }

        const required = calcRequiredXP(targetLevel.level);
        const { rank, total } = userService.getUserRank(target.id, interaction.guild.id)

        const Targetcard = new Rank()
            .setAvatar(target.displayAvatarURL({ extension: 'png' }))
            .setCurrentXP(targetLevel.xp)
            .setRequiredXP(required)
            .setLevel(targetLevel.level)
            .setUsername(target.username)
            .setBackground(`IMAGE`, "https://i.pinimg.com/736x/03/23/ad/0323ad804e005bb1ed5b8f694bb5c6a9.jpg")
            .setRank(rank)

        const img = await Targetcard.build();
        const attachmentTarget = new AttachmentBuilder(img, { name: "rank.png" });

        return interaction.reply({ files: [attachmentTarget] }).then(() => setTimeout(() => interaction.deleteReply(), 20000));
    }
 }