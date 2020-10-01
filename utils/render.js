	/**
	 * Render a template
   	 * @param {*} bot - server bot client
	 * @param {Request} req - Request object
	 * @param {Response} res - Response object
	 * @param {string} template - template name
	 * @param {Object} data - data object
	 * @param {Object} title - title data
	 * @param {boolean} [title.extend] - to extend base title
	 * @param {string} [title.title] - overwrite base title
	 */
	function Render(bot, req, res, template, data = {}, title = {}) {
		let renderTitle;
		if (title.title && title.extend) renderTitle = `${bot.user.username} - ${title.title}`;
		else if (title.title && !title.extend) renderTitle = title.title;
		else renderTitle = bot.user.username;
		const BaseData = {
			status: req.isAuthenticated() ? `${req.user.username}#${req.user.discriminator}` : 'Login',
			login: req.isAuthenticated() ? 'oui' : 'non',
			title: renderTitle,
			bot: bot.user,
			user: req.user,
		};
		res.render(__dirname + '/views/' + template, Object.assign(BaseData, data));
  }
  
  module.exports = Render;