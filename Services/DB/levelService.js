const userService = require("../DB/UserService");
const { calcRequiredXP } = require("../DB/mathService")

async function addXPAndCheckLevel(userId, guildId, amount,) {
    const user = userService.getUser(userId, guildId);

    
    if (!user) return;

    let leveledUp = false;

    user.xp += amount;

    let required = calcRequiredXP(user.level);


    while (user.xp >= required) {
        user.xp -= required;
        user.level += 1;
        leveledUp = true;
        required = calcRequiredXP(user.level);
    }

    userService.saveUser(user);

    return {...user, leveledUp};
}

module.exports = { addXPAndCheckLevel };
