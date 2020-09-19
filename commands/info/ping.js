const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'ping',
    category: 'info',
    description: 'Check the ping of Azunyan',
    aliases: ['p','botping'],
    usage: '',
    timeout: 3,
    run: async(bot, message, args)=>{
        try {
            const m = await message.channel.send("<a:discloading:756834988770721812>")
            const pingg = m.createdTimestamp - message.createdTimestamp;
            const pi = new Discord.MessageEmbed()
            if(pingg >= 0 && pingg < 500) {
            pi.setColor(0x2f3136)
            pi.addField("<a:IssueFixed:756835014611828806>  I responded to you in", `**${pingg}ms**`)
            return m.edit("\t", pi);
            }
            else if(pingg > 500 && pingg <= 10000) {
            pi.setColor(0x2f3136)
            pi.addField("<a:Issue:756835048933556266> I responded to you in", `**${pingg}ms**`)
            return m.edit("\t", pi);
            }

        } catch (err) {
            return message.channel.send(console.log(err));
        }
    }
}