const messages = require("./messages");
const members = require("./members");
const roles = require("./role");
const channels = require("./channel");
const voice = require("./vc");

module.exports = {
    ...messages,
    ...members,
    ...roles,
    ...channels,
    ...voice
}