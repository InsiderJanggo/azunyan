const {MessageEmbed} = require("discord.js");
const request = require("superagent");
const {
    OWNER
} = process.env;

module.exports = {
    name: "kiss",
    aliases: [""],
    description: "Kiss Someone OwO!!!",
    usage: "<mention>",
    timeout: 10,
    category: "fun",
    run: async(bot, message, args) => {
        let ment = message.mentions.users.first();
        let dev = [
            332109764286742529,
            671355502399193128
        ]
        if(!ment) return message.channel.send("You Need To Mention Someone you love OwO.");
        if(ment.id == bot.user.id && message.author.id !== dev.join(" || ")) return message.channel.send("You Cant Kiss Me >:(");
        if(ment.id == message.author.id) return message.channel.send("How Is That Possible");
        if(ment.id == bot.user.id && message.author.id == "671355502399193128") return message.channel.send("B-BAKA, Its not i like you or something");
        const {body} = await request
        .get("https://nekos.life/api/kiss");

        let botico = bot.user.displayAvatarURL({format: "png"});


        const e = new MessageEmbed()
        .setColor(process.env.COLOR)
        .setTitle(`${message.author.username} Kissed ${ment.username} OwO`)
        .setImage(body.url)
        .setFooter(
            `Azunyan Bot By ${OWNER}`,
            `${botico}`
        )
        message.channel.send({embed: e});

    },
};