const router = require('koa-router')()

const schema = require('./schema')
const userInfo = require('./userInfo')
const login = require('./login')

router.prefix('/api')

router.use('/schema', schema.routes(), schema.allowedMethods())
router.use('/userInfo', userInfo.routes(), userInfo.allowedMethods())
router.use('/entrance', login.routes(), login.allowedMethods())

module.exports = router
