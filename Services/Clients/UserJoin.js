const { ChatInputCommandInteraction, EmbedBuilder, GuildMember } = require('discord.js')
const userService = require("../DB/UserService")
const { getGuildInv,updateGuildInv } = require("../Invites/inviteCache")
const chnlService = require("../DB/channelService")

module.exports = {
name: 'guildMemberAdd', // name
/**
 * 
 * @param {GuildMember} user 
 */
    async execute(user) {
        

        if(user.user.bot) return;

        const guildId = user.guild.id

        const cachedInv = getGuildInv(guildId)
        const newInv = await user.guild.invites.fetch()

        let usedInv = null

        if (cachedInv.size === 0) {
            console.log("Invite cache empty — initializing now...");
            updateGuildInv(guildId, [...newInv.values()]);
        }
        
        newInv.forEach(inv => {
            const oldUses = cachedInv.get(inv.code) ?? 0;
            if (oldUses < inv.uses) {
                usedInv = inv;
            }
        });

        updateGuildInv(guildId, [...newInv.values()])

        if (!usedInv) {
            console.log(`${user.user.tag} joined, inviter unknown`);
            return;
        }

        const inviter = usedInv.inviter ?? null;

        const existing = await userService.getUser(user.user.id, guildId);

        if(!existing){
            await userService.saveUser({
                userId: user.user.id,
                guildId: user.guild.id,
                level: 1,
                xp: 0,
                points: 0,
                invites: 0
        })}

        if (inviter) {
            await userService.addInvite(inviter.id, 1, guildId);
        }

        const row = chnlService.getChannel(guildId);
        const logChannelId = row?.invites;
        const logChnl = logChannelId ? user.guild.channels.cache.get(logChannelId) : null;

            if(logChnl){
                if(inviter){
                    const userInviter = await userService.getUser(inviter.id, guildId);
                    logChnl.send(`${user.user.tag} joined - invite created by ${inviter.tag}\nInvites: ${userInviter.invites}`)
                }else{
                    logChnl.send(`${user.user.tag} joined - inviter is vanity`);
                }
            }
        return;
    }
};