const express     = require('express');

const config = require('./config');
const helper = require('./helper');

const port      = config.port;
const hostname  = config.hostname
const host      = `http://${hostname}:${port}/`;

const app = express();

app.get('/word/:language/:level', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    try {
        const language = req.params.language;
        const level = parseInt(req.params.level);
        const word = await helper.chooseWord(language, parseInt(level));
        res.send(word);
    }
    catch(err) {
        res.status(500).send(err);
    }
});

app.listen(config.port, config.hostname)
