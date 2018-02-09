import { computerVision } from "../../src";
const should = require('should');
const config = require('../config.js');

describe('Computer vision type tests', () => {

    const FRIENDS_IMAGE_URL = 'http://az616578.vo.msecnd.net/files/2016/10/09/636115830685164048-686058602_friends.jpg';

    it('should be able to instantiate a vision client', (done) => {
        let computerVisionClient = new computerVision({
            apiKey: config.computerVision.apiKey,
            endpoint: config.computerVision.endpoint
        });
        should(computerVisionClient).not.be.undefined();
        done();
    });

    describe('Analyze Image (POST)', () => {
        it('should accept application/json', (done) => {
            let computerVisionClient = new computerVision({
                apiKey: config.computerVision.apiKey,
                endpoint: config.computerVision.endpoint
            });
            computerVisionClient.analyzeImage({
                parameters: { visualFeatures: "Categories", details: "Celebrities,Landmarks", language: "" },
                body: { url: config.FRIENDS_IMAGE_URL },
                headers: { 'Content-Type': 'application/json' }
            }).then((response) => {
                should(response).not.be.undefined();
                should(response).have.properties(["categories", "metadata", "requestId"]);
                done();
            }).catch((err) => {
                //done(new Error("Error making request:" + err));
            });
        });
    });

});


