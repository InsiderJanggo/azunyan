const {MessageEmbed} = require("discord.js");

module.exports = {
    name: "channel",
    aliases: ["channelinfo"],
    description: "Return channel info",
    usage: "<channel>",
    category: "guild",
    timeout: 3,
    run: async(bot, message, args) => {
        function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? " day" : " days") + " ago";
        };
        let channel = message.mentions.channels.first();
        if(!channel) return message.channel.send("Please mention a channel.");
        let inline = true;
        try {
            let e = new MessageEmbed()
            .setTitle(`${channel} Information`)
            .setDescription(`Information About ${channel}`)
            .addField("Created At:", `${checkDays(channel.createdAt)}`, inline)
            .addField("Channel ID:", `${channel.id}`, inline)
            .addField("Channel Type:", `${channel.type}`, inline)
             message.channel.send({embed: e});
        } catch(error) {
            message.channel.send(error)
        }
    },
};