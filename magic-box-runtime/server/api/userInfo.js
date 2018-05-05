const router = require('koa-router')()

router.get('/getUserInfo', async ( ctx ) => {
  ctx.body = {
  "name": "brickspert",
  "intro": "please give me a star"
  }
})

module.exports = router
