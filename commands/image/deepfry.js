const AlexAPI = require("alexflipnote.js");
const AlexClient = new AlexAPI();
const {MessageAttachment} = require("discord.js")

module.exports = {
    name: "deepfry",
    description: "Deepfry User Avatar.",
    usage: "<image>",
    category: "image",
    timout: 10,
    aliases: ["fry"],
    run: async(bot, message, args) => {
        let msg = await message.channel.send("Please Wait...");
        let Avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({ format: 'png', dynamic: true, size: 2048 }) : message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 });
        let img = await AlexClient.image.deepfry({image: Avatar});
        let attach = new MessageAttachment(img, "deepfry.png");
        message.channel.send(attach);
        msg.delete();
    },
};