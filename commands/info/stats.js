const {MessageEmbed} = require("discord.js");

const osutils = require('os-utils');

module.exports = {
    name: "stats",
    aliases: ["botstats"],
    description: "Return bot stats.",
    usage: "",
    category: "info",
    timeout: 3,
    run: async(bot, message, args) => {
        var milliseconds = parseInt((bot.uptime % 1000) / 100),
        seconds = parseInt((bot.uptime / 1000) % 60),
        minutes = parseInt((bot.uptime / (1000 * 60)) % 60),
        hours = parseInt((bot.uptime / (1000 * 60 * 60)) % 24);
        days = parseInt((bot.uptime / (1000 * 60 * 60 * 24)) % 60);

        days = (days < 10) ? "0" + days : days;
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        osutils.cpuUsage(function(v) {
            const  e = new MessageEmbed()
            .addField("VPS Stats:", "Shows the stats of the VPS that the bot's running on.")
            .addField("--------------------------------------------------------------------------------","------------------------------------------------------------------------------")
            .addField("Platform", osutils.platform(),true)
            .addField("VPS CPU Cores", osutils.cpuCount() + " Cores",true)
            .addField("CPU Usage", `${(v * 100).toString().split(".")[0] + "." + (v * 100).toString().split(".")[1].split('')[0] + (v * 100).toString().split(".")[1].split('')[1]}%`,true)
            .addField("Total Memory", osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split('')[0] + osutils.totalmem().toString().split(".")[1].split('')[1] + "MB",true)
            .addField("RAM Usage Of VPS", `${(osutils.totalmem() - osutils.freemem()).toString().split(".")[0] + "." + ( osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split('')[0] + (osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split('')[1]}/${osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split('')[0] + osutils.totalmem().toString().split(".")[1].split('')[1]}MB`,true)
            .addField("RAM Usage Of Bot", (process.memoryUsage().heapUsed / 1024 / 1024 ).toFixed(2) + "MB/" + osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split('')[0] + osutils.totalmem().toString().split(".")[1].split('')[1] + "MB",true)
            .addField("RAM Usage Of VPS %", `${(100 - osutils.freememPercentage() * 100).toString().split(".")[0] + "." + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split('')[0] + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split('')[1]}%`,true)
            .addField("Ping", Math.round(bot.ping) + "ms", true)
            .addField("Uptime", days + "d " + hours + "h " + minutes + "m " + seconds + "." + milliseconds + "s", true)
                message.channel.send({embed: e});
        });
    },
};