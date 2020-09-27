const {
    DOMAIN,
    COLOR
} = process.env;
const {
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: "dashboard",
    aliases: ["panel"],
    description: "Redirect user to bot dashboard/panel",
    usage: "",
    category: "info",
    run: async(bot, message, args) => {
        let e = new MessageEmbed()
        .setTitle("Azunyan Dashboard:")
        .setDescription(`${DOMAIN}`)
        .setColor(COLOR)
        .setTimestamp(new Date())
        message.channel.send({embed: e});
    },
};