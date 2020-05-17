const { weather, nekos, getFact, getFox } = require('./util');

module.exports.commands = {
    hello: {
        execute: ({ ctx: { reply } }) => {
            reply('Hello!');
        },
        alt: ['привет'],
        description: 'тестовая команда',
    },
    help: {
        execute: ({ ctx: { reply }, prefix }) => {
            let help = '';
            for (const [key, value] of Object.entries(this.commands)) {
                let command = `${prefix}${key}`;
                if (value.args) {
                    command += ` ${value.args}`;
                }
                help += `${command}: ${value.description}\n`;
            }
            reply(help);
        },
        alt: ['команды', 'помощь'],
        description: 'список команд',
    },
    neko: {
        execute: async ({ ctx: { replyWithPhoto } }) => {
            const url = await nekos();
            replyWithPhoto({ url });
        },
        alt: ['неко'],
        description: 'случайное изображение из nekos',
    },
    fox: {
        execute: async ({ ctx: { replyWithPhoto } }) => {
            const url = await getFox();
            replyWithPhoto({ url });
        },
        alt: ['лис'],
        description: 'случайное изображение лиса',
    },
    fact: {
        execute: async ({ ctx: { reply } }) => {
            const result = await getFact();
            reply(result);
        },
        alt: ['факт'],
        description: 'случайный факт',
    },
    weather: {
        execute: async ({ ctx: { reply }, args }) => {
            const [query] = args;
            if (!query) {
                reply('Введите название города');
            } else {
                try {
                    const result = await weather(query);
                    reply(result);
                } catch (error) {
                    reply('упс, произошла ошибка');
                }
            }
        },
        alt: ['погода'],
        description: 'погода в этом городе',
        args: '[sity]',
    },

};
