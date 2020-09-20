const {MessageEmbed} = require("discord.js");

module.exports = {
    name: "help",
    aliases: ["menu"],
    description: "Open Help Command",
    usage: "<cmd name>",
    run: async(bot, message, args) => {
        if(args[0]) {
            return getCMD(bot ,message, args[0]);
        } else {
            return allCMD(bot, message);
        }
    },
};



async function allCMD(bot, message) {
    let guildData = await Guild.findOne({guildID: message.guild.id})
    const e = new MessageEmbed()
    .setTitle("PINK")
    .setTitle(`Command[${bot.commands.size}]`)
    .addField(`Prefix:`, `${guilData.prefix}`, true)
    const commands = (category) => {
        return bot.commands
                .filter(cmd => cmd.category === category)
                .map(cmd => `\`${cmd.name}\``)
    }

    const info = bot.categories
                .map(cat => stripIndents `**${cat[0].toUpperCase() + cat.slice(1)}`)
                .reduce((string, category) => string + "\n" + category)

    return message.channel.send(e.setDescription(info))''
}

function getCMD(bot, message, input) {
    const e = new MessageEmbed()
    
    const cmd = bot.commands.get(input.toLowerCase() || bot.commands.get(bot.aliases.get(input.toLowerCase())));

    let info = `No Information Found For Command **${input.toLowerCase()}**`;

    if(!cmd) {
        return message.channel.send(e.setColor("RED").setDescription(info));
    }

    if(cmd.name) info = `**Command Name:**: ${cmd.name}`;
    if(cmd.aliases) info += `\n**Aliases**: ${cmd.aliases.map(a => a `\`${a}\``).join(", ")}`;
    if(cmd.description) info += `\n**Description**: ${cmd.description}`;
    if(cmd.timeout) info += `\n**Cooldown**: ${cmd.timeout} S`
    if(cmd.usage) {
        info += `\n**Usage**: ${cmd.usage}`;
        e.setFooter(`Syntax: <> = required, [] = optional`);
    }

    return message.channel.send(e.setColor("PINK").setDescription(info));
}