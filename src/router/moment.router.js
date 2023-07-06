const { verify } = require('jsonwebtoken');
const Router = require('koa-router');
const momentRouter = new Router({ prefix: '/moment' });
const {
      create
      ,
      detail,
      list,
      update,
      remove
} = require('../controller/moment.controller.js');
// const {
//       verifyAuth,
//       verifyPermission
// } = require('../middleware/auth.middleware');
// const {
//       verifyLabelExists
// } = require('../middleware/label.middleware');

// momentRouter.post('/', verifyAuth, create);
//新增动态
momentRouter.post('/create', create);

//获取所有动态列表
momentRouter.get('/list', list);
momentRouter.post('/detail', detail);
//修改动态内容
momentRouter.post('/:momentId', update);
// // 1.用户必须登录 2.用户具备权限
// momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update);
momentRouter.delete('/:momentId', remove);

// // 给动态添加标签
// momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExists, addLabels);

// // 动态配图的服务
// momentRouter.get('/images/:filename', fileInfo);

module.exports = momentRouter;
