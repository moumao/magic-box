const path = require('path')
const router = require('koa-router')()
const { uploadFile } = require('../util/upload')

router.post('/upload', async ctx => {
    const serverFilePath = path.join( __dirname, 'static/image' )

    try {
        const result = await uploadFile( ctx, {
            path: serverFilePath
        })
        ctx.body = { 'state_code': '0', ...result }
    } catch (e) {
        ctx.body = { 'state_code': e }
    }

})

module.exports = router
