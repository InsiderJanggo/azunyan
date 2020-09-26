const {MessageEmbed} = require("discord.js");

module.exports = {
    name: "setprefix",
    aliases: ["prefix"],
    description: "Set Your Own Custom Prefix.",
    usage: "<prefix>",
    category: "guild",
    timeout: 120,
    run: async(bot, message, args) => {
        if(!args[0]) return message.channel.send("Please Specify The Prefix");
        if(args[0].length > 5) return message.channel.send("Max Characters is 5");
        let data = await Guild.findOne({
			guildID: message.guild.id
		});

        let e = new MessageEmbed()
        .setColor(process.env.COLOR)
        .setDescription(`Succefully Change The Prefix To ${args[0]}`);
        message.channel.send({e});
        data.prefix = args[0]; data.save();
    },
};