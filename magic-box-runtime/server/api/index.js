const router = require('koa-router')()

const schema = require('./schema')
const user = require('./user')
const picture = require('./picture')

router.prefix('/api')

router.use('/schema', schema.routes(), schema.allowedMethods())
router.use('/user', user.routes(), user.allowedMethods())
router.use('/picture', picture.routes(), picture.allowedMethods())

module.exports = router
