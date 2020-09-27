const app = require("express").Router();
const Render = require('../../utils/render');

app.get("/", (req, res, next) => {
    Render(req.bot, req, res, 'premium', {
        
    });
});

module.exports = app;