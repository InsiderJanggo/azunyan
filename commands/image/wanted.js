const {MessageAttachment} = require("discord.js");
const Swiftcord = require("swiftcord");
const canva = new Swiftcord.Canvas();

module.exports = {
    name: "wanted",
    aliases: [""],
    description: "manipulate wanted meme",
    usage: "[mention]",
    category: "images",
    timeout: 10,
    run: async(bot, message, args) => {
        let msg = await message.channel.send("Please Wait...");
        let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({dynamic: false, format: 
            'png'}) : message.author.avatarURL({  dynamic: false, format: 'png'});
        let image = await canva.wanted(avatar);
        let attach = new MessageEmbed(image, "wanted.png");
        message.channel.send(attach);
        msg.delete();
    },
};