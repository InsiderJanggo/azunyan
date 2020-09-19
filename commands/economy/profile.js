const {MessageEmbed} = require("discord.js");

module.exports = {
    name: "profile",
    aliases: ["pf", "$"],
    category: "economy",
    timeout: 3,
    description: "Show The User Bio",
    usage: "[mention]",
    run: async(bot, message, args) => {
        let member = message.guild.member(message.mentions.user.first() || message.author)

        if(member.user.bot) return message.channel.send("Its A Bot -_-");
        let data = await User.findOne({guildID: message.guild.id, userID: member.user.id})

        if(!data) return bot.nodb(member.user);

        let inline = true;
        let e = new MessageEmbed()
        .setTitle(`${member.user.username} Profile:`)
        .setDescription(`Bio: ${data.bio || data.prefix + 'bio [text]'}`)
        .addField("Money" `${data.money || 0}`, inline)
        .addField("Level" `${data.level || 1}`, inline)
        .addField("XP", `${data.xp || 0}/${process.env.UPXP}`, inline)
        .addField("Messages", `${data.messages || 0}`, inline)
        .addField("Warn", `${data.warn || 0}/${process.env.WARN}`)
        message.channel.send({embed: e});
    },
};