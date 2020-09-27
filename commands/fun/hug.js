const { MessageEmbed } = require('discord.js');
const request = require('superagent');

module.exports = {
    name: "hug",
    aliases: [""],
    description: "Hug Someone OwO",
    usage: "<mention>",
    category: "fun",
    timeout: 5,
    run: async(bot, message, args) => {
        let ment = message.mentions.users.first();
        if(!ment) 
            return message.channel.send("Please mention a user");
        if (ment.id == message.author.id)
            return message.channel.send('How Is That Possible');
        if (ment.id == bot.user.id && message.author.id == '671355502399193128')
            return message.channel.send('B-BAKA, Its not i like you or something');
        const { body } = await request.get('https://nekos.life/api/hug');

        let botico = bot.user.displayAvatarURL({ format: 'png' });

        let e = new MessageEmbed()
        .setColor(process.env.COLOR)
        .setTitle(`${message.author.username} Hugged ${ment.username} OwO`)
        .setImage(body.url)
        .setFooter(
            'This bot was made by the contributors on [here](https://github.com/InsiderJanggo/azunyan)',
        )
        .setAuthor(`${bot.user.username}`, botico)
        message.channel.send({embed: e});
    },
};