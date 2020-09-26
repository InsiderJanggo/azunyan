const {MessageAttachment} = require("discord.js");
const Swiftcord = require("swiftcord");
const canva = new Swiftcord.Canvas();

module.exports = {
    name: "hitler",
    aliases: [""],
    description: "Manipulate hitler meme from family guy",
    usage: "[mention]",
    category: "images",
    timeout: 10,
    run: async(bot, message, args) => {
        let msg = await message.channel.send("Please Wait...");
        let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({dynamic: false, format: 
            'png'}) : message.author.avatarURL({  dynamic: false, format: 'png'});
        let image = await canva.hitler(avatar);
        let attachment = new MessageAttachment(image, "hitler.png");
       message.channel.send(attachment);
       msg.delete();
    },
};