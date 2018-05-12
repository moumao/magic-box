const cors = require('koa2-cors')

module.exports = app => {
  app.use(cors({
    origin: ctx => {
      return 'http://my.magic.com';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Set-cookie'],
    maxAge: 86400,
    credentials: true,
    allowMethods: ['GET'],
    allowHeaders: ['withCredentials', 'Content-Type', 'Authorization', 'Accept', 'Set-cookie'],
  }))
}
