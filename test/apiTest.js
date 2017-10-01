const assert    = require('chai').assert;
const request   = require('request-promise');

const config    = require('../src/config');
const host      = `http://${config.hostname}:${config.port}/word/`;
let options     = config.testOptions;

describe('API usage', () => {
    require('../src/index');

    it('should return 200 and contain correct response body if GET request with correct parameters', done => {
        const url = host + 'de/2';
        const opt = Object.assign({url: url}, options);
        request(opt).then(res => {
            assert.equal(res.statusCode, 200);
            assert.property(JSON.parse(res.body), 'word');
            assert.property(JSON.parse(res.body), 'translation');
            done();
        });
    });

    it('should return 500 and correct error text if GET request with incorrect language', done => {
        const url = host + 'it/1';
        const opt = Object.assign({url: url}, options);
        request(opt).catch(err => {
            assert.equal(err.statusCode, 500);
            assert.equal(err.response.body, 'language should be one of ["de", "en"]');
            done();
        });
    });

    it('should return 500 and correct error text if GET request with incorrect level', done => {
        const url = host + 'en/6';
        const opt = Object.assign({url: url}, options);
        request(opt).catch(err => {
            assert.equal(err.statusCode, 500);
            assert.equal(err.response.body, 'level should be one of [1, 2, 3]');
            done();
        });
    });
})