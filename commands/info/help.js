const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/Guild');

module.exports = {
	name: 'help',
	timeout: 5,
	aliases: ['h'],
	category: 'info',
	description: 'Display all commands and descriptions',
	run: async (client, message, args) => {
		if (args[0]) {
			const command = await client.commands.get(args[0]);

			if (!command) {
				return message.channel.send('Unknown Command: ' + args[0]);
			}

			let embed = new MessageEmbed()
				.setAuthor(command.name, client.user.displayAvatarURL())
				.setThumbnail(client.user.displayAvatarURL())
				.setColor(process.env.COLOR)
				.setFooter(`Prefix: ${guildData.prefix}`);

			if (command.description) {
				embed.addField('Description', '```' + command.description + '```');
			} else {
				embed.addField('Description', '```' + 'Not Provided' + '```');
			}

			if (command.aliases) {
				embed.addField(
					'Aliases',
					'```' + `${command.aliases.map((a) => `${a}`).join(', ')}` + '```',
				);
			} else {
				embed.addField('Aliases', '```' + 'None' + '```');
			}

			if (command.usage) {
				embed.addField('Usage', '```' + command.usage + '```');
			} else {
				embed.addField('Usage', '```' + 'Not Provided' + '```');
			}

			if (command.timeout) {
				embed.addField('Cooldown', '```' + command.timeout + '```');
			} else {
				embed.addField('Cooldown', '```' + 'Not Provided' + '```');
			}

			return message.channel.send(embed);
		} else {
			let guildData = await Guild.findOne({ guildID: message.guild.id });
			const commands = await client.commands;

			let emx = new MessageEmbed()
				.setDescription(
					'[Invite link!](https://discord.com/oauth2/authorize?client_id=733455907824074783&scope=bot&permissions=34948166)',
				)
				.setColor(process.env.COLOR)
				.setFooter(`Prefix: ${guildData.prefix}`)
				.setThumbnail(client.user.displayAvatarURL());

			let com = {};
			for (let comm of commands.array()) {
				let category = comm.category || 'Unknown';
				let name = comm.name;

				if (!com[category]) {
					com[category] = [];
				}
				com[category].push(name);
			}

			for (const [key, value] of Object.entries(com)) {
				let category = key;

				let desc = '`' + value.join('`, `') + '`';

				emx.addField(`${category.toUpperCase()}[${value.length}]`, desc);
			}

			return message.channel.send(emx);
		}
	},
};
