const bodyParser = require('koa-bodyparser')
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')

module.exports = app => {
    const store = new MysqlSession({
      host     :  '127.0.0.1',
      user     :  'root',
      password :  '',
      database :  'magic_box'
    })

    const cookie = {              // 与 cookie 相关的配置
            domain: 'magic.com',  // 写cookie所在的域名
            path: '/',            // 写cookie所在的路径
            // maxAge: 86400 * 5,    // cookie有效时长
            expires: new Date('2018-6-19'),
            httpOnly: true,       // 是否只用于http请求中获取
            overwrite: false      // 是否允许重写
        }

    // 应用解析请求体的中间件, koa-bodyparser 支持 json, form, text 类型的请求体
    app.use(bodyParser())
    // 应用处理 session 的中间件
    app.use(session({
        key: 'session-id',          // cookie 中存储 session-id 时的键名, 默认为 koa:sess
        cookie,
        store
    }))
}
