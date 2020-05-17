const weather = require('weather-js');
const Client = require('nekos.life');
const neko = new Client();
const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { getFox } = require('randomfox.js');

module.exports.weather = (query) => {
    return new Promise((resolve, reject) => {
        weather.find({ search: query,
            degreeType: 'C' }, (err, result) => {
            if (err) {
                console.error(err);
            }
            try {
                const info = result[0].current;
                resolve(`Температура: ${info.temperature} C
Небо: ${info.skytext}
Влажность: ${info.humidity}%
Ветер: ${info.winddisplay}`);
            } catch (e) {
                reject(e);
            }
        });
    });
};

module.exports.nekos = async () => {
    const { url } = await neko.sfw.neko();

    return url;
};

module.exports.getFact = async () => {
    const { data } = await axios.get('https://randstuff.ru/fact/');
    const dom = new JSDOM(data);

    return dom.window.document.querySelector('tbody').textContent;
};

module.exports.getFox = async () => {
    const { image } = await getFox();
    const url = image.startsWith('http:') ? image.replace('http', 'https') : image;

    return url;
};
