const Bot = require('../client/Client');
const { Message } = require('discord.js')
module.exports = {
    name: 'message',
    /**
     * @param {Message} message
     * @param {Bot} client
     */
    run: async(client, message) => {
        if(message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(client.prefix)) return;
        const [ cmd, ...args ] = message.content.slice(client.prefix.length).trim().split(/ +/g);
        const command = client.getCommand(cmd.toLowerCase());
        if(!command) return;
        command.run(client, message, args).catch(console.error);
    }
};