const {MessageAttachment} = require("discord.js");
const Swiftcord = require("swiftcord");
const canva = new Swiftcord.Canvas();

module.exports = {
    name: "gay",
    aliases: [""],
    description: "GAY...",
    usage: "[mention]",
    category: "image",
    timeout: 10,
    run: async(bot, message, args) => {
        let msg = await message.channel.send("Please Wait...");
        let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({dynamic: false, format: 
            'png'}) : message.author.avatarURL({  dynamic: false, format: 'png'});
        let image = await canva.gay(avatar);
        let attach = new MessageAttachment(image, "gay.png");
        message.channel.send(attach);
        msg.delete();
    },
};