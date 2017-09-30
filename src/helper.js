const Promise = require('bluebird');

const config = require('./config');

const wordObj     = config.wordObj;
const thresholds  = config.levelThresholds;
const parenRegex  = /\s?\([\w\s]+\)/g

exports.chooseWord = async (language, level) => {
    const dic    = await retreiveDictionary(language);
    const fArray = await filterDictionary(dic, level);
    const word   = await buildObject(dic, fArray);
    return word;
}

function retreiveDictionary(language) {
    return new Promise(() => {
        resolve(language === 'de' ? require('./assets/german_english') : require('./assets/english_german'));
        reject('Unable to load dictionary');
    });
}

function filterDictionary(dicObj, level) {
    const min = thresholds[level].min;
    const max = thresholds[level].max;  
    return new Promise(() => {
        resolve(Object.keys(dicObj).filter((word) => min < shorten(word).length && shorten(word).length < max));
        reject('Failed to filter dictionary keys');
    })
}

function buildObject(dic, fArray) {
    return new Promise(() => {
        const word = fArray[Math.floor(Math.random() * fArray.length)];
        const additionalInfo = word.search(parenRegex);

        wordObj.word            = additionalInfo ? shorten(word) : word;
        wordObj.translation     = dic[word];
        wordObj.additionalInfo  = additionalInfo;
        return wordObj;
    })
}

function shorten(word) {
    // remove any additional information provided in parentheses
    return word.replace(parenRegex, '')
}