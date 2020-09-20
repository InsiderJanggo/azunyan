const { MessageEmbed } = require('discord.js');
const ms = require('ms');
const User = require('../../models/User');

module.exports = {
	name: 'daily',
	aliases: ['bonus', 'timely'],
	usage: '500 coins',
	description: 'Get Daily Bonus',
	category: 'economy',
	run: async (bot, message, args) => {
		let data = await User.findOne({
			guildID: message.guild.id,
			userID: message.author.id,
		});

		if (
			data._time !== null &&
			process.env.TIMELY - (Date.now() - data._time) > 0
		)
			return message.channel.send(
				`You Already Recieved Daily Drop. Please Wait For ${ms(
					process.env.TIMELY - (Date.now() - data._time),
				)}`,
			);

		let e = new MessageEmbed()
			.setDescription(`You Recieved ${process.env.HOW} Daily Drop`)
			.setColor(process.env.COLOR);
		message.channel.send({ embed: e });
		data._time = Date.now();
		data.money += parseInt(process.env.HOW);
		data.save();
	},
};
