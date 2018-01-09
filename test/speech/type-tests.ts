import * as cognitive from '../../src';
import * as config from '../config';

const speakerIdentificationClient = new cognitive.speakerIdentification({
    apiKey: config.academicKnowledge.apiKey,
    endpoint: config.academicKnowledge.endpoint
})


const body = {
    locale: 'en-US'
}

speakerIdentificationClient.createProfile({body:{}})
speakerIdentificationClient.createProfile({
    body
}).then(response => {

});