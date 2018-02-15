import {qnaMaker} from "../../src";

const config = require('../config.js');

const before = require('before');
const after = require ('after');
const should = require('should');

describe('QnA maker', () => {

    let qnaMakerClient = new qnaMaker({
        apiKey: config.qnaMaker.apiKey,
        endpoint: config.qnaMaker.endpoint
    });

    var knowledgeBaseId;

    before(done => {

        qnaMakerClient.createKnowledgeBase({
            body: { name:  "QnA Maker FAQ Bot",
                qnapairs: [
                    {
                        answer: "You can change the default message if you use the QnAMakerDialog. See this for details: https://docs.botframework.com/en-us/azure-bot-service/templates/qnamaker/#navtitle",
                        question: "How can I change the default message from QnA Maker?"
                    },
                    {
                        answer: "You can use our REST apis to manage your KB. See here for details: https://westus.dev.cognitive.microsoft.com/docs/services/58994a073d9e04097c7ba6fe/operations/58994a073d9e041ad42d9baa",
                        question: "How do I programmatically update my KB?"
                    }
                    ],
                urls: [
                        "https://docs.microsoft.com/en-in/azure/cognitive-services/qnamaker/faqs"
                    ]
                }
        }).then(response => {
            should(response).not.be.undefined();
            should(response).have.properties(['kbId', 'dataExtractionResults']);
            should(response.dataExtractionResults).be.Array().and.have.length(1);
            should(response.dataExtractionResults[0]).have.properties(['sourceType', 'extractionStatusCode', 'source']);
            knowledgeBaseId = response.kbId;
            done();
        }).catch(err => {
            done();
        });
    });

    after(done => {
        console.log('Deleting knowledge base...')

        qnaMakerClient.deleteKnowledgeBase({
            parameters: {knowledgeBaseId: knowledgeBaseId}
        }).then(response => {
            should(response).be.undefined();
            done();
        }).catch(err => {
            done();
        });
    });

    describe('Download knowledge base', () => {
        it('should return response', (done) => {

            qnaMakerClient.downloadKnowledgeBase({
                parameters: {knowledgeBaseId: knowledgeBaseId}
            }).then(response => {
                should(response).not.be.undefined();
                done();
            }).catch(err => {
                done();
            });
        })
    });

    describe('Generate answer', () => {
        it('should return response', (done) => {
         
            qnaMakerClient.generateAnswer({
                parameters: {knowledgeBaseId: knowledgeBaseId},
                body: { question: "is qna maker free?", top: 3}
            }).then(response => {
                should(response).not.be.undefined();
                should(response).have.property('answers');
                done();
            }).catch(err => {
                done();
            });
        })
    });

    describe('Get alterations', () => {
        it('should return response', (done) => {

            qnaMakerClient.getAlterations({
                parameters: { knowledgeBaseId: knowledgeBaseId }
            }).then(response => {
                should(response).not.be.undefined();
                should(response).have.property('wordAlterations')
                should(response.wordAlterations).be.Array();
                done();
            }).catch(err => {
                done();
            });
        })
    });

    describe('Publish knowledge base', () => {
        it('should return response', (done) => {
           
            qnaMakerClient.publishKnowledgeBase({
                parameters: { knowledgeBaseId: knowledgeBaseId}
            }).then(response => {
                should(response).be.undefined();
                done();
            }).catch(err => {
                done();
            });
        })
    });

    describe('Train knowledge base', () => {
        it('should return response', (done) => {

            qnaMakerClient.trainKnowledgeBase({
                parameters: {knowledgeBaseId: knowledgeBaseId},
                body: {
                    feedbackRecords: [
                        {
                            userId: 1,
                            userQuestion: "hey",
                            kbQuestion: "hi",
                            kbAnswer: "hey"
                        }
                    ]
                }
            }).then(response => {
                should(response).be.undefined();
                done();
            }).catch(err => {
                done();
            });
        })
    });

    describe('Update alterations', () => {
        it('should return response', (done) => {
            
            qnaMakerClient.updateAlterations({
                parameters: { knowledgeBaseId: knowledgeBaseId },
                body: { 
                    add: [
                        {
                            word: "botframework",
                            alterations: [
                                "bot frame work"
                            ]  
                        }
                    ],
                    delete:
                        [
                            {
                            word: "webchat",
                            alterations: [
                                "web chat"
                            ]
                        }
                    ]
                }
            }).then(response => {
                should(response).be.undefined();
                done();
            }).catch(err => {
                done();
            });
        })
    });

    describe('Update knowledge base', () => {
        it('should return response', (done) => {

            qnaMakerClient.updateKnowledgeBase({
                parameters:{knowledgeBaseId: knowledgeBaseId},
                body: {
                    add: {
                        qnaPairs: [
                            {
                                answer: "Hello, How can I help you?",
                                question: "Hello"
                            }
                        ],
                        urls: [
                            "https://docs.microsoft.com/en-in/azure/cognitive-services/qnamaker/faqs"
                        ]
                    },
                    delete: {
                        qnaPairs: [
                            {
                                answer: "The QnA Maker tool ingests and matches data in UTF-16 encoding. This means that any language should work as is. Having said that, we have only extensively tested the relevance of the service for EN yet.",
                                question: "Does the QnA Maker support non-EN languages?"
                            }
                        ]
                    }
                }
            }).then(response => {
                should(response).be.undefined();
                done();
            }).catch(err => {
                done();
            });
        })
    });
});