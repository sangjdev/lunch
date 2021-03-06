require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');

const app = new Koa();
const router = new Router();

const api = require('./api');
const cors = require('./middlewares/cors');
const port = process.env.PORT || 4002;

app.use(cors);
app.use(koaBody({ multipart: true }));
router.use('/api', api.routes());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);
