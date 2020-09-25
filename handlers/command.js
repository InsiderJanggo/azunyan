const { readdirSync } = require('fs');
const ascii = require('ascii-table');
const table = new ascii("Commands");
table.setHeading('Command', 'Load status');

module.exports = (bot) => {
    readdirSync('./commands/').forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
            try {
                if (typeof pull.name != 'string' || typeof pull != 'object') throw new Error('Missing a name or name is not a String');
                if (pull.category && typeof pull.category !== 'string') throw new Error('category is not a String');
                if (pull.description && typeof pull.description !== 'string') throw new Error('description is not a String');
                if (pull.timeout && typeof pull.timeout !== 'number') throw new Error('timeout is not a Number');
                if (pull.usage && typeof pull.usage !== 'string') throw new Error('usage is not a String');
                if (pull.name) {
                    bot.commands.set(pull.name, pull);
                    table.addRow(file, '√')
                }
                if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => bot.aliases.set(alias, pull.name));
            } catch (error) {
                table.addRow(file, `X -> ${error}`)
                continue;
            }
        }
    });
    console.log(table.toString());
}
