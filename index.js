const { Collection ,Client, MessageEmbed, MessageAttachment } = require('discord.js');
require("dotenv").config();
require("module-alias/register");

const fs = require('fs');
const bot = new Client({
    disableMentions: true,
    fetchAllMembers: true
});

bot.website = require("@website/dashboard");
bot.commands = new Collection();
bot.aliases = new Collection();
bot.categories = fs.readdirSync("./commands/");
const Timeout = new Set();
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(bot);
});

const request = require('request');
const path = require('path');
const ms = require('ms')

const filter = m => m.content.includes('discord');

const mongosee = require("mongoose");
mongosee.connect(process.env.MONGODB, {useNewUrlParser: true, useUnifiedTopology: true});
mongosee.connection.on('connected', () => {
    console.log("[Database] Connected");
})

//Include The DB Model
const User = require("@models/User.js");
const Guild = require("@models/Guild.js");



bot.on('ready', async() => {
    bot.user.setActivity(`${PREFIX}`, {type: "PLAYING"});
    console.log(`Hello, I am online on ${bot.guilds.cache.size} servers and serving ${bot.users.cache.size} users`);
    await bot.website.load(bot);
})

bot.on("error", async(err) => {
    console.log(err)
})


bot.on('message', async (message) => {
if(message.author.bot) return;
if(!message.content.toLowerCase().startsWith(process.env.PREFIX)) return;
if(!message.guild) {
    const t = new MessageEmbed()
    t.setTitle('STOP WHERE YOU ARE! ✋')
    t.setColor(0xf94343)
    t.setDescription('🤷‍♀️ | You can\'t use commands inside DMs')
    t.setTimestamp(new Date())
    t.setFooter('You may stop using commands in DMs')
    return message.channel.send(t);
}
if(!message.member) message.member = await message.guild.fetchMember(message);
const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
const com = args.shift().toLowerCase();
if(com.length == 0 ) return;
const command = bot.commands.get(com) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(com));
if(command){
    if(command.timeout){
        if(Timeout.has(`${message.author.id}${command.name}`)){
            let um = new MessageEmbed()
            um.setTitle("Hold Up ✋!")
            um.setDescription(`You have to wait more ${ms(command.timeout)}, to use this command again`)
            um.addField('Why?', 'Because this system was installed, in order not to flood the chat with bot commands everywhere', true)
            um.setFooter(`This message gets deleted after 10s`)
            um.setTimestamp(new Date())
            um.setColor(0xf94343)
            return message.reply(um).then(message => message.delete({ timeout: 10000 }));
        } else {
            Timeout.add(`${message.author.id}${command.name}`)
            setTimeout(() => {
                Timeout.delete(`${message.author.id}${command.name}`)
            }, command.timeout);
        }
    }
    command.run(bot, message, args)
}
    bot.nodb = (user) => message.channel.send(new MessageEmbed().setColor("RED")
    .setDescription(`${user.tag} Is Not On The Database`))

    let user = await User.findOne({guildID: message.guild.id, userID: message.author.id});
    let guild = await Guild.findOne({guildID: message.guild.id});

    if(!user) {
        User.create({
            guildID: message.guild.id,
            userID: message.author.id,
        });
    }
    if(!guild) {
        Guild.create({
            guildID: message.guild.id
        });
    }

    let rand = Math.floor(Math.random() * 5);
    user.money += random;
    user.xp++
    user.messages++

    if(user.xp >= process.env.UPXP) {
        let e = new MessageEmbed()
        .setColor(process.env.COLOR)
        .setDescription(`[:tada:] Congrats ${message.author.username} You Level Up`)
        message.channel.send(e);
        user.xp -= process.env.UPXP;
        user.level += 1;
    }

    user.save();
})

bot.login(process.env.TOKEN);

module.exports = bot;