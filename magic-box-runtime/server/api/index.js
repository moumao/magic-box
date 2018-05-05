const router = require('koa-router')()

const schema = require('./schema')
const userInfo = require('./userInfo')

router.prefix('/api')

router.use('/schema', schema.routes(), schema.allowedMethods())
router.use('/userInfo', userInfo.routes(), userInfo.allowedMethods())

module.exports = router
