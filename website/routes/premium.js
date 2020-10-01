const app = require("express").Router();
const Render = require('@utils/render');
const bot = require("@root/index");

const {
    CLIENTID,
} = process.env;

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
	else {
		return res.redirect('/login');
	}
}

app.get("/", checkAuth, (req, res, next) => {
    Render(req.bot, req, res, 'premium', {
        invite: `https://discordapp.com/oauth2/authorize?client_id=${CLIENTID}&scope=bot&permissions=0`,
        title: "Premiun"
    });
});

module.exports = app;
