const app = require('./app/index.js')
const config = require('./app/config.js')

app.listen(8000, () => {
  console.log(`koa st6art successfull ${config.APP_PORT}`)
})  