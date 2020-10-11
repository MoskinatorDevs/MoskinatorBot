const Bot = require('../client/Client');
const { Message, MessageEmbed } = require('discord.js')
module.exports = {
    name: 'ping',
    /**
     * @param {Message} message
     * @param {Bot} client
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const msg = await message.channel.send('Pinging...')
        const embed = new MessageEmbed()
            .setTitle('PONG!')
            .setDescription(`Pong!\nClient WebSocket ping is: ${client.ws.ping}MS!\nMessage edit ping is: ${msg.createdAt - message.createdAt}MS!`)
            .setColor(`RANDOM`)
            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: `png` }))
        await msg.edit(embed)
    },
    aliases: ['latency']
}