module.exports = (guild) => {
    let channelID;
	let channels = guild.channels.cache;
	channelLoop: for (let c of channels) {
		let channelType = c[1].type;
		if (channelType === 'text') {
			channelID = c[0];
			break channelLoop;
		}
	}
	let channel = bot.channels.cache.get(guild.systemChannelID || channelID);
	channel.send();
};