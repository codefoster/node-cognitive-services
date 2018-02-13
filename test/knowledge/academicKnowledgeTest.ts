import { academicKnowledge } from "../../src";
const should = require('should');
const config = require('../config.js');

describe('Academic Knowledge type testing', () => {
    let acadmicKnowledgeClient = new academicKnowledge({
        apiKey: config.academicKnowledge.apiKey,
        endpoint: config.academicKnowledge.endpoint
    });

    describe('construcor', () =>{
        it('should be able to instantiate an Acadmic Knowledge', (done) => {
            should(acadmicKnowledgeClient).not.be.undefined();
            done();
        });
    });

    describe('calcHistogram', () =>{
       it('calculate the distribution of attribute values for a set of paper entities', (done) =>{
           acadmicKnowledgeClient.calcHistogram({
               parameters: { expr: "And(Composite(AA.AuN=='jaime teevan'),Y>2012)",model: "latest"},
               headers : {"Ocp-Apim-Subscription-Key": "f2152d2559c749bb830af53f774d3dfd" }
           }).then((response) =>{
            should(response).not.be.undefined();
               should(response).have.properies(['expr', 'num_entities', 'histograms']);
               done();
           }).catch((err) => {
                done();
           });
       });
            
    });
    
});
