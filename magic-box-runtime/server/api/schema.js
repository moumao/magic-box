const router = require('koa-router')()
const { query } = require('../util/db')

const selectByUser = async value => {
    const sql = `SELECT * FROM page WHERE author=?`
    const dataList = await query(sql, value)
    return dataList
}

const selectById = async value => {
    const sql = `SELECT * FROM page WHERE id=?`
    const dataList = await query(sql, value)
    return dataList
}

const deleteById = async value => {
    const sql = `DELETE FROM page WHERE id=?`
    const dataList = await query(sql, value)
    return dataList
}

router.get('/getByUser', async ctx => {
    const { session } = ctx
    const { userName, isLogin } = session
    const dataList = await selectByUser([userName])
    const body = { 'state_code': '0', schemaData: dataList }
    ctx.body = body
})

router.get('/getById', async ctx => {
    const { query } = ctx
    const { id } = query
    const dataList = await selectById([id])
    const body = dataList.length === 0 ? { 'state_code': 'no such page' } : { 'state_code': '0', schemaData: dataList[0] }
    ctx.body = body
})

router.get('/deleteById', async ctx => {
    const { session } = ctx
    const { userName } = session
    const { query } = ctx
    const { id } = query
    const dataList = await deleteById([id])
    const newDataList = await selectByUser([userName])
    const body = { 'state_code': '0', schemaData: newDataList }
    ctx.body = body
})

module.exports = router
