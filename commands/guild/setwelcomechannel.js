const {MessageEmbed} = require("discord.js");
const {
    COLOR
} = process.env;

module.exports = {
    name: "setwelcome",
    aliases: ["setwelcomechannel"],
    description: "Azunyan Will Welcomed new member on specific channel",
    usage: "<channel>",
    timeout: 100,
    run: async(bot, message, args) => {
        let data = await Guild.findOne({
            guildID: message.guild.id
        });
        let channel =  message.mentions.channels.first();
        if(!channel) return message.channel.send("Please Provide a channel");
        let e = new MessageEmbed()
        .setDescription(`Successfully set welcome channel at ${channel}`)
        .setTimestamp(new Date())
        .setColor(COLOR)
        message.channel.send({embed: e});
        data.welcomeChannel = channel; data.save();
    },
};