const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bodyparser = require('body-parser');
const { Strategy } = require('passport-discord');
const path = require('path');

const app = express();
const port = 3000;

module.exports.load = async (bot) => {
	passport.serializeUser((user, done) => done(null, user));
	passport.deserializeUser((obj, done) => done(null, obj));

	const scopes = ['identify', 'guilds'];

	passport.use(new Strategy({
		clientID: process.env.CLIENTID,
		clientSecret: process.env.CLIENTSECRET,
		callbackURL: process.env.development ? process.env.DOMAIN : `http://localhost:${port}`+'/login',
		scope: scopes,
	}, function (accessToken, refreshToken, me, done) {
		process.nextTick(() => done(null, me));
	}));

	app
		.use(bodyparser.json())
		.use(bodyparser.urlencoded({ extended: true }))
		.engine('html', require('ejs').renderFile)
		.use(express.static(path.join(__dirname + '/public')))
		.set('view engine', 'ejs')
		.use(
			session({
				secret: 'azunyan dashboard',
				resave: false,
				saveUninitialized: false,
			}),
		)
		.use(passport.initialize())
		.use(passport.session());

	app
		.get('/login', passport.authenticate('discord', { failureRedirect: '/' }),
			function (req, res) {
				res.redirect('/me');
			},
		)
		.get('/logout', function (req, res) {
			req.logout();
			res.redirect('/');
		})
		.get('/', function (req, res) {
			Render(req, res, 'index', {
				invite: `https://discordapp.com/oauth2/authorize?client_id=${process.env.CLIENTID}&scope=bot&permissions=0`,
			});
		})
		.get('/me', CheckAuth, function (req, res) {
			Render(req, res, 'profile', {
				guilds: req.user.guilds.filter((u) => (u.permessions & 2146958591) == 2146958591),
				avatarURL: `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png`,
				iconURL: `https://cdn.discordapp.com/${req.user.id}/${req.user.avatar}.png?size=32`,
			}, {
				title: req.user.username,
				extend: true
			});
		})
		.get('/servers/:guildID', CheckAuth, function (req, res) {
			const serv = bot.guilds.cache.get(req.params.guildID);

			if (!serv)
				return res.redirect(
					`https://discordapp.com/oauth2/authorize?client_id=${process.env.CLIENTID}&scope=bot&permissions=0&guild_id${req.params.guildID}`,
				);

			if (
				!bot.guilds.cache
					.get(req.params.guildID)
					.members.get(req.user.id)
					.hasPermission('MANAGE_GUILD')
			)
				return res.redirect('/dashboard');

			Render(req, res, 'server', {
				guild: serv,
				avatarURL: `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png`,
				iconURL: `https://cdn.discordapp.com/${req.user.id}/${req.user.avatar}.png?size=32`,
			}, {
				title: serv.name,
				extend: true
			});
		})
		.post('/servers/:guildID', CheckAuth, function (req, res) {
			if (!req.body.send_CHANNELID)
				return res.send('Error, Please specify the channel');

			if (!req.body.send_MESSAGE) return res.send('Error, Message not specify');

			bot.guilds.cache
				.get(req.params.guildID)
				.channels.get(req.body.send_CHANNELID)
				.send(req.body.send_MESSAGE);

			res.redirect(`/servers/${req.params.guildID}`);
		})
		.get('*', function (req, res) {
			res.redirect('/');
		});

	function CheckAuth(req, res, next) {
		if (req.isAuthenticated()) return next();
		else {
			return res.redirect('/login');
		}
	}

	/**
	 * Render a template
	 * @param {Request} req - Request object
	 * @param {Response} res - Response object
	 * @param {string} template - template name
	 * @param {Object} data - data object
	 * @param {Object} title - title data
	 * @param {boolean} [title.extend] - to extend base title
	 * @param {string} [title.title] - overwrite base title
	 */
	function Render(req, res, template, data = {}, title = {}) {
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

	app.listen(port, function (err) {
		if (err) return console.log(err);
		console.log(`Dashboard connected on port: ${port}`);
	});
};
