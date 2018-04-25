const router = require('koa-router')()

const schema = require('./schema')

router.prefix('/api')

router.use('/schema', schema.routes(), schema.allowedMethods())

module.exports = router
