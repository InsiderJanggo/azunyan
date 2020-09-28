module.exports = async(bot) => {
    bot.user.setActivity(`${process.env.PREFIX}`, { type: 'PLAYING' });
	console.log(
		`Hello, I am online on ${bot.guilds.cache.size} servers and serving ${bot.users.cache.size} users`,
    );
    //Init The Dashboard.
	await bot.website.load(bot); 
};