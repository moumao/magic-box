const Koa = require('koa')
const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('koa-bodyparser')
const path = require('path')
const static = require('koa-static')
const app = new Koa();
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3001

require('./middleware/cors')(app)
require('./middleware/session')(app)

app.use(bodyParser())

app.use(static(
  path.join( __dirname,  './static')
))

const api = require('./api/index')
app.use(api.routes()).use(api.allowedMethods())

const config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

const nuxt = new Nuxt(config)

if (config.dev) {
  const builder = new Builder(nuxt)
    builder.build().catch(e => {
      console.error(e)
      process.exit(1)
    })
}

app.use(async (ctx, next) => {
  await next()
  ctx.status = 200
  return new Promise((resolve, reject) => {
    ctx.res.on('close', resolve)
    ctx.res.on('finish', resolve)
    nuxt.render(ctx.req, ctx.res, promise => {
      promise.then(resolve).catch(reject)
    })
  })
})

app.listen(port)
