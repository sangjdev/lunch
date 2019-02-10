const Router = require('koa-router');
const imageCtrl = require('./image.controller');

const image = new Router();

image.get('/', imageCtrl.list);

module.exports = image;
