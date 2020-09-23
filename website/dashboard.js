const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bodyparser = require('body-parser');
const { Strategy } = require('passport-discord');
const path = require('path');

const app = express();

module.exports.load = async (bot) => {
	passport.serializeUser((user, done) => {
		done(null, user);
	});
	passport.deserializeUser((obj, done) => {
		done(null, obj);
	});

	var scopes = ['identify', 'guilds'];

	passport.use(
		new Strategy(
			{
				clientID: process.env.CLIENTID,
				clientSecret: process.env.CLIENTSECRET,
				callbackURL: `${process.env.DOMAIN}/login`,
				scope: scopes,
			},
			function (accessToken, refreshToken, profile, done) {
				process.nextTick(function () {
					return done(null, profile);
				});
			},
		),
	);

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
		.get(
			'/login',
			passport.authenticate('discord', { failureRedirect: '/' }),
			function (req, res) {
				res.redirect('/me');
			},
		)
		.get('/logout', function (req, res) {
			req.logout();

			res.redirect('/');
		})
		.get('/', function (req, res) {
			res.render(__dirname + '/views/index.ejs', {
				status: req.isAuthenticated()
					? `${req.user.username}#${req.user.discriminator}`
					: 'Login',
				bot: bot.user,
				user: req.user,
				login: req.isAuthenticated() ? 'oui' : 'non',
				invite: `https://discordapp.com/oauth2/authorize?client_id=${process.env.CLIENTID}&scope=bot&permissions=0`,
			});
		})
		.get('/me', CheckAuth, function (req, res) {
			res.render(__dirname + '/views/profile.ejs',
				{
					status: req.isAuthenticated()
						? `${req.user.username}#${req.user.discriminator}`
						: 'Login',
					bot: bot.user,
					user: req.user,
					guilds: req.user.guilds.filter(
						(u) => (u.permessions & 2146958591) == 2146958591,
					),
					avatarURL: `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png`,
					iconURL: `https://cdn.discordapp.com/${req.user.id}/${req.user.avatar}.png?size=32`,
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

			res.render(__dirname + '/views/profile.ejs',
				{
					status: req.isAuthenticated()
						? `${req.user.username}#${req.user.discriminator}`
						: 'Login',
					user: req.user,
					guilds: serv,
					avatarURL: `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png`,
					iconURL: `https://cdn.discordapp.com/${req.user.id}/${req.user.avatar}.png?size=32`,
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

	function CheckAuth(res, req, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			return res.redirect('/login');
		}
	}

	app.listen(3000, function (err) {
		if (err) return console.log(err);

		console.log('Dashboard Ready!!!');
	});
};
