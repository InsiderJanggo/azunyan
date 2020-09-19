const {MessageEmbed} = require("discord.js");

module.exports = {
    name: "setstatus",
    usage: "<text>",
    aliases: [""],
    description: "Set Your Own Status",
    timeout: 120,
    category: "info",
    run: async(bot, message, args) => {
        let reason = args.join(" ").slice(0);
        if(!reason) return message.channel.send("Please Specify The Text");
        if(reason < 1) return message.channel.send("Please Enter More Than 2 words");
        let data = await User.findOne({
            userID: message.author.id,
            guildID: message.guild.id
        });

        if(!data) return bot.nodb(member.user);

        let inline = true;
        let e = new MessageEmbed()
        .setColor(process.env.COLOR)
        .setDescription(`Set Your Status To ${reason}`)
        message.channel.send({embed: e});
    },
};