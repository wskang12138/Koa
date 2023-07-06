// const { verify } = require('jsonwebtoken');
const Router = require('koa-router');
const utdataRouter = new Router({ prefix: '/utdata' });

const { create, list } = require('../controller/utdata.controller.js');
//新增动态
utdataRouter.post('/create', create);
utdataRouter.get('/list', list);
module.exports = utdataRouter;
