const {MessageAttachment} = require("discord.js");
const Swiftcord = require("swiftcord");
const canva = new Swiftcord.Canvas();

module.exports = {
    name: "delete",
    aliases: [""],
    description: "manipulate delete meme",
    usage: "[mention]",
    timout: 10,
    category: "image",
    run: async(bot, message, args) => {
        let msg = await message.channel.send("Please Wait...");
        let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({dynamic: false, format: 
            'png'}) : message.author.avatarURL({  dynamic: false, format: 'png'});
        let image = await canva.delete(avatar);
        let attach = new MessageAttachment(image, "delete.png");
        message.channel.send(attach);
        msg.delete();
    },
};