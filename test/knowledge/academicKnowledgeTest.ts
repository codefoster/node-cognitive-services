import { academicKnowledge } from "../../src";
const should = require('should');
const config = require('../config.js');

describe('Academic Knowledge', () => {
    let acadmicKnowledgeClient = new academicKnowledge({
        apiKey: config.academicKnowledge.apiKey,
        endpoint: config.academicKnowledge.endpoint
    });

    describe('calcHistogram', () =>{
        it('should be able to instantiate an Acadmic Knowledge', (done) => {
        
        
            should(acadmicKnowledgeClient).not.be.undefined();
            done();
        });
    });
    should(acadmicKnowledgeClient).not.be.undefined();
    
});
