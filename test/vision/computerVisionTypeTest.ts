import { computerVision } from "../../src";
const should = require('should');
const config = require('../config.js');

describe('Computer vision type tests', () => {
    it('should be able to instantiate a vision client', (done) => {
        let computerVisionClient = new computerVision({
            apiKey: config.computerVision.apiKey,
            endpoint: config.computerVision.endpoint
        });
        should(computerVisionClient).not.be.undefined();
        done();
    });
});
