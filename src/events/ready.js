const { Client } = require('discord.js');
const Bot = require('../client/Client');
module.exports = {
    name: 'ready',
    /**
     * @param {Bot} client
     */
    run: async(client) => {
        console.log(`${client.user.username} is now Online and Ready!`);
    }
};