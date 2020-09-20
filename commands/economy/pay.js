const { MessageEmbed } = require('discord.js');
const User = require('../../models/User');

module.exports = {
	name: 'pay',
	aliases: ['give'],
	category: 'economy',
	usage: '<mention> <amount of money>',
	timeout: 120,
	description: 'Give Someone Money',
	run: async (bot, message, args) => {
		let member = message.guild.member(message.mentions.users.first());
		if (!member) return message.channel.send('Please Mention A User');
		if (!args[1]) return message.channel.send('Please Enter Valid Number');
		if (args[1] < 1)
			return message.channel.send('You Need To Transfer More Than 1');
		if (isNaN(args[1])) return message.channel.send('Thats Not A Number -_-');

		let author = await User.findOne({
			guildID: message.guild.id,
			userID: message.author.id,
		});
		let target = await User.findOne({
			guildID: message.guild.id,
			userID: member.id,
		});

		if (!target) return bot.nodb(member.user);

		if (author.money < args[1])
			return message.channel.send('You Cant Transfer Less Than 1');
		if (author.userID == member.id)
			return message.channel.send('How Is That Possible');
		if (member.user.bot) return message.channel.send('Its A Bot -_-');

		let e = new MessageEmbed()
			.setColor(process.env.COLOR)
			.setDescription(
				`**${message.author.username}**  Gave ${member.user.username} ${args[1]}`,
			);
		author.money -= Math.floor(parseInt(args[1]));
		target.money += Math.floor(parseInt(args[1]));
		author.save();
		target.save();
		message.channel.send({ embed: e });
	},
};
