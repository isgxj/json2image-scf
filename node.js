const json2image = require('json2image');
const { createCanvas, Image, registerFont } = require('canvas');

// registerFont('./font/PingFang.ttf', { family: 'PingFang SC' });
global.document = {
  createElement: createCanvas,
};
global.Image = Image;

module.exports = json2image;
