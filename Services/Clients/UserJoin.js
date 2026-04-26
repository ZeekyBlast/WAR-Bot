const { ChatInputCommandInteraction, EmbedBuilder, GuildMember } = require('discord.js')
const userService = require("../DB/UserService")
const { getGuildInv,updateGuildInv } = require("../Invites/inviteCache")

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

        await userService.saveUser({
            userId: user.user.id,
            guildId: user.guild.id,
            level: 1,
            xp: 0,
            points: 0,
            invites: 0
        })

        if (inviter) {
            await userService.addInvite(inviter.id, 1, guildId);
            console.log(`${user.user.tag} joined - invited created by ${inviter.tag}`);

            const userInviter = await userService.getUser(inviter.id, guildId);
            console.log(userInviter ? userInviter.invites : "Inviter not found in DB");
        } else {
            console.log(`${user.user.tag} joined - inviter is vanity`);
        }
    }
};