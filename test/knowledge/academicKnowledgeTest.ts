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

    describe('Calchistogram Post', () => {
        it('should return response', (done) => {

            acadmicKnowledgeClient.calcHistogramPost({
                headers: {  "Content-Type": "application/x-www-form-urlencoded", "Ocp-Apim-Subscription-Key": "f2152d2559c749bb830af53f774d3dfd"},
                body: {  expr: "And(Composite(AA.AuN=='jaime teevan'),Y>2012)"}
            }).then((response) => {
                should(response).not.be.undefined();
                should(response).have.properties(['expr', 'num_entities', 'histograms'])
                done();
            }).catch((err) => {
                done();
            });
        })
    });

    describe('Evaluate', () => {
        it('should return response', (done) => {

            acadmicKnowledgeClient.evaluate({
                parameters: {expr: "Composite(AA.AuN=='jaime teevan')"},
                headers : {"Ocp-Apim-Subscription-Key": "f2152d2559c749bb830af53f774d3dfd" }
            }).then((response) => {
                should(response).not.be.undefined();
                should(response).have.properties(['expr', 'entities'])
                done();
            }).catch((err) => {
                done();
            });
        })
    });

    describe('Evaluate Post', () => {
        it('should return response', (done) => {

            acadmicKnowledgeClient.evaluatePost({
                headers: { "Content-Type": "application/x-www-form-urlencoded", "Ocp-Apim-Subscription-Key": "f2152d2559c749bb830af53f774d3dfd" },
                body: {expr: "Composite(AA.AuN=='jaime teevan')"}
            }).then((response) => {
                should(response).not.be.undefined();
                should(response).have.properties(['expr', 'entities'])
                done();
            }).catch((err) => {
                done();
            });
        })
    });

    describe('Get similarity', () => {
        it('should return response', (done) => {

            acadmicKnowledgeClient.getSimilarity({
                parameters:{ "s1": "home", "s2": "house" }
            }).then((response) => {
                should(response).not.be.undefined();
                should(response).be.Number;
                done();
            }).catch((err) => {
                done();
            });
        })
    });

    describe('GraphSearch', () => {
        it('should return response', (done) => {

            acadmicKnowledgeClient.graphSearch({
                parameters: {
                    "mode": "json"
                },
                headers: {"Content-Type": "application/json", "Ocp-Apim-Subscription-Key": "f2152d2559c749bb830af53f774d3dfd"},
                body: {
                    "path": "/paper/AuthorIDs/author",
                    "paper": {
                        "type": "Paper",
                        "NormalizedTitle": "graph engine",
                        "select": [
                            "OriginalTitle"
                        ]
                    },
                    "author": {
                        "return": {
                            "type": "Author",
                            "Name": "bin shao"
                        }
                    }
                }
            }).then((response) => {
                should(response).not.be.undefined();
                should(response).have.property("Results")
                done();
            }).catch((err) => {
                done();
            });
        })
    });

    describe('Interpret', () => {
        it('should return response', (done) => {

            acadmicKnowledgeClient.interpret({
                parameters: {query: "papers by jaime"}
            }).then((response) => {
                should(response).not.be.undefined();
                should(response).have.properties(['query', 'interpretations'])
                done();
            }).catch((err) => {
                done();
            });
        })
    });

    describe('Interpret Post', () => {
        it('should return response', (done) => {
            
            acadmicKnowledgeClient.interpretPost({
                headers: {"Content-Type": "application/x-www-form-urlencoded", "Ocp-Apim-Subscription-Key": "f2152d2559c749bb830af53f774d3dfd"},
                body: {query: "\"papers by jaime\""}
            }).then((response) => {
                should(response).not.be.undefined();
                should(response).have.properties(['query', 'interpretations'])
                done();
            }).catch((err) => {
                done();
            });
        })
    });

    describe('Post similarity', () => {
        it('should return response', (done) => {

            acadmicKnowledgeClient.postSimilarity({
                headers: { "Content-Type": "application/x-www-form-urlencoded", "Ocp-Apim-Subscription-Key": "f2152d2559c749bb830af53f774d3dfd"},
                body: {s1: "home", s2: "house"}
            }).then((response) => {
                should(response).not.be.undefined();
                should(response).be.Number;
                done();
            }).catch((err) => {
                done();
            });
        })
    });
    
});
