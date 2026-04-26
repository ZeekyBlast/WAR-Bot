const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { Guilds, GuildMembers, GuildMessages, MessageContent, GuildInvites } = GatewayIntentBits
const { User, Message, GuildMember, ThreadMember } = Partials
require('dotenv').config()


const client = new Client({ 
    intents: [Guilds, GuildMembers, GuildMessages, MessageContent, GuildInvites], 
    partials: [User, Message, GuildMember, ThreadMember, MessageContent]  
})

const { loadEvents } = require('./Handlers/eventHandler')

client.events = new Collection();
client.subCommands = new Collection();
client.cmds = new Collection()

loadEvents(client);


client.login(process.env.TOKEN)
    