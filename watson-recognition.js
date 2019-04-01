const VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
const fs = require('fs');

let classifiers = [
  'default',
  'food',
  'explicit',
  'face'];

var threshold = 0.75;

// valid values en, ar, de, es, fr, it, ja, ko
var language = "en";

var visualRecognition = new VisualRecognitionV3({
  "version": '2018-03-19',
  "iam_apikey": "",
  "iam_apikey_description": "",
  "iam_apikey_name": "",
  "iam_role_crn": "",
  "iam_serviceid_crn": "",
  "url": "",
  "headers": {
        // Watson services log requests and their results to improve the services
        // for future users. The logged data is NOT shared or made public.
        // Set X-Watson-Learning-Opt-Out to true or 1 on each request that you
        // do not want IBM to access for general service improvements.
        'X-Watson-Learning-Opt-Out': 'true'
    }
});

var params = {
  // images_file: fs.createReadStream('../data/images.zip'),
  url: 'http://wellingtoneuropeandayspa.com/wp-content/uploads/eminence-organics-acne-face-mapping.jpg',
  classifier_ids: classifiers,
  accept_language: language,
  threshold: threshold
};

visualRecognition.classify(params, function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(JSON.stringify(res, null, 4));
  }
});
