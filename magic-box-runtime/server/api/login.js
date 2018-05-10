const router = require('koa-router')()

router.get('/login', async (ctx) => {
  const ctx_query = ctx.query

  ctx.body = {
    'state_code': '0'
  }
})

module.exports = router
