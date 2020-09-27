const { MessageEmbed } = require("discord.js");


module.exports = {
    name: "serverinfo",
    aliases: ["server"],
    description: "Return server information",
    usage: "",
    category: "guild",
    timeout: 3,
    run: async(bot, message, args) => {
        let roleList = message.guild.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(r => r)
        .join(",");
      if (roleList.length > 1024) roleList = "To many roles to display";
      if (!roleList) roleList = "No roles";
        function checkDays(date) {
          let now = new Date();
          let diff = now.getTime() - date.getTime();
          let days = Math.floor(diff / 86400000);
          return days + (days == 1 ? " day" : " days") + " ago";
      };
      let verifLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
      let region = {
          "eu-central": ":flag_eu: Central Europe",
          "singapore": ":flag_sg: Singapore",
          "us-central": ":flag_us: U.S. Central",
          "sydney": ":flag_au: Sydney",
          "us-east": ":flag_us: U.S. East",
          "us-south": ":flag_us: U.S. South",
          "us-west": ":flag_us: U.S. West",
          "eu-west": ":flag_eu: Western Europe",
          "vip-us-east": ":flag_us: VIP U.S. East",
          "london": ":flag_gb: London",
          "amsterdam": ":flag_nl: Amsterdam",
          "hongkong": ":flag_hk: Hong Kong",
          "russia": ":flag_ru: Russia",
          "southafrica": ":flag_za:  South Africa",
          "japan": ":flag_jp: Japan",
          "europe": ":flag_eu: Europe"
      }
      const embed = new MessageEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL)
      .setColor('PURPLE')
      .addField("Name", message.guild.name, true)
      .addField("ID", message.guild.id, true)
      .addField("Owner", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
      .addField("Region", region[message.guild.region], true)
      .addField("Total | Humans | Bots", `${message.guild.memberCount} | ${message.guild.members.cache.filter(member => !member.user.bot).size} | ${message.guild.members.cache.filter(member => member.user.bot).size}`, true)
      .addField("Verification Level", message.guild.verificationLevel, true)
      .addField("Channels", message.guild.channels.cache.size, true)
      .addField("Roles",message.guild.roles.cache.size, true)
      .addField("Creation Date", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
      .addField("Roles List", roleList)
      .setThumbnail(message.guild.iconURL({dynamic: false}))
      message.channel.send(embed);
    },
};