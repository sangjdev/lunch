const Router = require('koa-router');
const image = require('./image');

const api = new Router();

api.use('/image', image.routes());

module.exports = api;
