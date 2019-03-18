const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

const nlu = new NaturalLanguageUnderstandingV1({
  "version": "2018-04-05",
  "iam_apikey": "tgXPpDu76Jet8MNfx0cLdKepKY3bKUwJxCxk-mMFBDLC",
  "iam_apikey_description": "Auto generated apikey during resource-key operation for Instance - crn:v1:bluemix:public:natural-language-understanding:us-south:a/d8c461ce19fe48ce907dc3ca0d821470:d4d5621a-6ebb-47a1-b6e5-c419ab0f3e98::",
  "iam_apikey_name": "auto-generated-apikey-97a3d734-f56c-4d17-8c6f-edf5df3b09de",
  "iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Manager",
  "iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/d8c461ce19fe48ce907dc3ca0d821470::serviceid:ServiceId-1b7b8850-a2b7-4150-8f3a-d47a5b70557b",
  "url": "https://gateway.watsonplatform.net/natural-language-understanding/api"
});

const text = 'The president of good';

const options = { 
  text,
  features: { 
    entities: { }, 
    keywords: { }, 
    sentiment: { } 
  } 
} 

nlu.analyze(
  options, 
  (err, results) => { 
    if (err) {
      console.error(err);
    }
    console.log(results); 
  }
);

