import * as cognitive from '../../src';
import * as config from '../config';

const academicKnowledgeClient = new cognitive.academicKnowledge({
    apiKey: config.academicKnowledge.apiKey,
    endpoint: config.academicKnowledge.endpoint
})

academicKnowledgeClient.calcHistogram({
    parameters: {}
})