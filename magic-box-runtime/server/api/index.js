const router = require('koa-router')()

const schema = require('./schema')
const user = require('./user')

router.prefix('/api')

router.use('/schema', schema.routes(), schema.allowedMethods())
router.use('/user', user.routes(), user.allowedMethods())

module.exports = router
