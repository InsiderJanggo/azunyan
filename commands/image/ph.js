const {} = require("discord.js");
const AlexAPI = require("alexflipnote.js");
const AlexClient = new AlexAPI();

module.exports = {
    name: "ph",
    description: "Manipulate PH Logo",
    usage: "<text1> <text2>",
    category: "image",
    aliases: [""],
    timeout: 10,
    run: async(bot, message, args) => {
        let text1 = args[0];
        let text2 = args[1];
        if(!text1) return message.channel.send("Please provided the first text");
        if(!text2) return message.channel.send("Please provided the second message");
        let ph = await AlexClient.image.pornhub({text1:text1, text2:text2});
        message.channel.send({files: [ph]});
    }
}