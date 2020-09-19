const {MessageEmbed} = require("discord.js");

module.exports = {
    name: "setstatus",
    usage: "<1/100>",
    aliases: [""],
    description: "Set Your Own Status",
    timeout: 120,
    category: "info",
    run: async(bot, message, args) => {
        let reason = args.join(" ").slice(0);
        if(!reason) return message.channel.send("Please Specify The Text");
        if(reason.length >= 100) return message.channel.send(`Unfortunately, I cannot give you such a description. It is ${reason.length} long`);
        let data = await User.findOne({
            userID: message.author.id,
            guildID: message.guild.id
        });

        if(!data) return bot.nodb(message.author);

        let e = new MessageEmbed()
        .setColor(process.env.COLOR)
        .setDescription(`Set Your Status To ${reason}`)
        data.status = reason; data.save();
        message.channel.send({embed: e});
    },
};