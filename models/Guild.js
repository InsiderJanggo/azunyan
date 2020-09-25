const mongoose = require("mongoose");

const schema = mongoose.Schema({
    guildID: String,
    prefix: {
        type: String,
        default: process.env.PREFIX
    },
    welcomeChannel: {
        type: String
    },
    levelUpChannel: {
        type: String
    }
});

module.exports = mongoose.model("Guild", schema);