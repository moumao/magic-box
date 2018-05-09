const router = require('koa-router')()

router.get('/getUserInfo', async ( ctx ) => {
  ctx.body = {
    "name": "user1",
    "intro": "please give me a star",
    "header": "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
  }
})

module.exports = router
