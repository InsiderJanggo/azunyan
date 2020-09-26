module.exports = {
    name: "reverse",
    usage: "<text>",
    description: "Reverse your desired words",
    category: "fun",
    timeout: 5,
    alises: [""],
    run: async(bot, message, args) => {
        const text = args.join();
        if(!text) return message.channel.send("Please provide a word.")
        if(text.length < 1) return message.channel.send("BAKA, HOW CAN I REVERSE 1 WORD!!!")
        const converted = text.split('').reverse().join('');
        message.channel.send(`\u180E${converted}`);
    },
};