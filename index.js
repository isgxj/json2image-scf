'use strict';
const json2image = require('./node');
exports.main_handler = (event, context, callback) => {
  const { queryString = {}, body, httpMethod } = event;
  let data = {};
  const isGetMethod = httpMethod === 'GET';
  if (isGetMethod && queryString.data) {
    data = JSON.parse(queryString.data);
  } else {
    data = JSON.parse(body);
  }
  data = json2image.decodeKeys(data);

  const imageType = data.output || 'jpeg';

  json2image(
    data,
    url => {
      const base64Data = url.replace(/^data:image\/\w+;base64,/, '');
      callback(null, {
        isBase64Encoded: true,
        statusCode: 200,
        headers: { 'Content-Type': `image/${imageType}` },
        body: base64Data,
      });
    },
    err => {
      callback(err, {
        isBase64Encoded: false,
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(err),
      });
    }
  );
};
