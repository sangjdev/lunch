const Router = require('koa-router');
const imageCtrl = require('./image.controller');

const image = new Router();

image.get('/', imageCtrl.list);
image.post('/', imageCtrl.upload);

module.exports = image;
