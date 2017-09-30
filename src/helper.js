const Promise = require('bluebird');

const config = require('./config');

const languages   = config.availableLanguages;
const levels      = config.availableLevels;
const thresholds  = config.levelThresholds;

exports.chooseWord = async (language, level) => {
    resolveParams(language, level);
    const dic    = await retreiveDictionary(language);
    const fArray = await filterDictionary(dic, level);
    const word   = await buildObject(dic, fArray);
    return word;
}

function resolveParams(language, level) {
    if (!checkLang(language)) throw 'language should be one of ["de", "en"]';
    if (!checkLevel(level)) throw 'level should be one of [1, 2, 3]';
}

function checkLang(language) {
    return languages.indexOf(language) > -1
}

function checkLevel(level) {
    return levels.indexOf(level) > -1
}

function retreiveDictionary(language) {
    return new Promise((resolve, reject) => {
        resolve(language === 'de' ? require('./assets/german_english') : require('./assets/english_german'));
        reject('Unable to load dictionary');
    });
}

function filterDictionary(dicObj, level) {
    const min = thresholds[level].min;
    const max = thresholds[level].max;  
    return new Promise((resolve, reject) => {
        resolve(Object.keys(dicObj).filter((word) => min < word.length && word.length < max));
        reject('Failed to filter dictionary keys');
    })
}

function buildObject(dic, fArray) {
    return new Promise(resolve => {
        const word = fArray[Math.floor(Math.random() * fArray.length)];
        resolve({word: word, translation: dic[word]});
    })
}
