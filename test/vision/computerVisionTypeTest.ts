import { computerVision } from "../../src";
const should = require('should');
require('dotenv').config();

describe('Computer vision type tests', () => {
    it('should be able to instantiate a vision client', (done) => {
        let computerVisionClient = new computerVision({
            apiKey: process.env.NCS_VISION_KEY,
            endpoint: process.env.NCS_VISION_ENDPOINT
        });
        should(computerVisionClient).not.be.undefined();
        done();
    });
});
