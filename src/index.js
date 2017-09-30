const express     = require('express');

const config = require('./config');
const helper = require('./helper');

const port      = config.port;
const hostname  = config.hostname
const host      = `http://${hostname}:${port}/`;

const app = express();

app.get('/:language/:level/word', async (req, res) => {
    try {
        const word = await helper.chooseWord(language, level);
        res.send(word);
    }
    catch(err) {
        res.status(500).send(err);
    }
});

app.listen(config.port, config.hostname, () => console.log('Listening at:', host))