const { Telegraf } = require('telegraf');
const { commands } = require('./commands');
const config = require('./config');
const bot = new Telegraf(config.token);
const prefix = config.prefix ? config.prefix : '/';

const worker = async (ctx) => {
    const { update: { message } } = ctx;
    const query = message.text.slice(1).toLowerCase();
    const queryArray = query.split(' ');
    const args = queryArray.slice(1);
    const [commandName] = queryArray;
    const command = commands[commandName] ? commands[commandName]
        : Object.values(commands).find((c) => c.alt && c.alt.includes(commandName));

    if (command) {
        command.execute({
            ctx,
            args,
            prefix });
    }
};

bot.hears((text) => text.startsWith(prefix), (ctx) => worker(ctx));

bot.launch().then(() => console.log('bot ready'));
