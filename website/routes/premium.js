const app = require("express").Router();


app.get("/", (req, res, next) => {
    Render(req, res, 'premium', {
        
    });
});

module.exports = app;