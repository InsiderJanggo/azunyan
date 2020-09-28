const {MessageAttachment} = require("discord.js");
const Swiftcord = require("swiftcord");
const canva = new Swiftcord.Canvas();

module.exports = {
    name: "invert",
    aliases: [""],
    description: "Invert Someone Avatar",
    usage: "[mention]",
    category: "image",
    timeout: 10,
    run: async(bot, message, args) => {
        let msg = await message.channel.send("Please Wait...");
        let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({dynamic: false, format: 
            'png'}) : message.author.avatarURL({  dynamic: false, format: 'png'});
        let image = canva.invert(avatar);
        let attach =  new MessageAttachment(image, "invert.png");
        message.channel.send(attach);
        msg.delete();
    },
};