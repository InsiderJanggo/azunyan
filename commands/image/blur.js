const AlexAPI = require("alexflipnote.js");
const AlexClient = new AlexAPI();
const {MessageAttachment} = require("discord.js")

module.exports = {
    name: "blur",
    aliases: [""],
    usage: "<image>",
    description: 'Blur User Image',
    category: "image",
    timeout: 10,
    run: async(bot, message, args) => {
        let msg = await message.channel.send("Please Wait...");
        let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({ format: 'png', dynamic: true, size: 2048 }) : message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 });
        let img = await AlexClient.image.blur({image: avatar})
        let attach = new MessageAttachment(img, "blur.png");
        message.channel.send(attach);
        msg.delete();
    },
};