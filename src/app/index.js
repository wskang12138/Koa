const Koa = require('koa');
const views = require('koa-views')
const json = require('koa-json')
const logger = require('koa-logger')
const session = require('koa-session')

const bodyParser = require('koa-bodyparser');
const errorHandler = require('./error-handle');
const useRoutes = require('../router');
const cors = require('koa2-cors');

const app = new Koa();

app.useRoutes = useRoutes;

//跨域请求
app.use(cors({
  origin: function(ctx) {
    if (/^\/test\/?/.test(ctx.url)) {
      return "*"; // 允许来自所有域名请求
    }
    return 'http://localhost:5500'; // 只允许 http://localhost: 5500 这个域名的请求
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'], // getResponseHeader()可以返回我们所需的值
  maxAge: 5, // 设置只本次验证的有效时间，即在该时间段内服务端可以不用进行验证
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE','PUT'], // 设置所允许的HTTP请求方法
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'], // 该字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段
}))
// session 中间件配置
app.keys = ['some secret hurr'];
const CONFIG = {
  key: 'koa:sess', // 默认值
  maxAge: 86400000, // 过期时间
  overwrite: true, // 默认
  httpOnly: true, // true——只有服务器端可以获取
  signed: false, // 签名，默认
  rolling: false, // 是否每次访问都重新设置过期时间
  renew: false, // 快过期时当有用户访问将过期时间重置
};
app.use(session(CONFIG, app));

// 接受post 请求体中的数据
app.use(bodyParser({
  enableTypes: ['json', 'form', 'text'] // 启用类型
}))

app.use(json())
app.use(logger())

app.use(require('koa-static')(__dirname + '/public'))
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))
//路由

app.useRoutes();
app.on('error', errorHandler);

// logger
app.use(async(ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

module.exports = app;
