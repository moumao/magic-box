const router = require('koa-router')()
const { objTojsonEscape } = require('../util/utils')
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
    const res = await query(sql, value)
    return res
}

const updateSchema = async value => {
    const sql = `UPDATE page SET schemaData=? WHERE id=?`
    const dataList = await query(sql, value)
    return dataList
}

const insterSchema = async value => {
    const sql = `insert into page (id, author, schemaData, url) values (?,?,?,?)`
    const dataList = await query(sql, value)
    return dataList
}

const getMaxId = async () => {
    const sql = `select max(id) from page`
    const data = await query(sql)
    return data
}

router.get('/getByUser', async ctx => {
    const { session } = ctx
    const { userName, isLogin } = session
    const dataList = await selectByUser([userName])
    const body = { 'state_code': '0', schemaDataList: dataList }
    ctx.body = body
})

router.get('/getById', async ctx => {
    const { query } = ctx
    const { id } = query
    const dataList = await selectById([id])
    const body = dataList.length === 0 ? { 'state_code': 'no such page' } : { 'state_code': '0', schemaDataList: dataList[0] }
    ctx.body = body
})

router.get('/deleteById', async ctx => {
    const { session } = ctx
    const { userName } = session
    const { query } = ctx
    const { id } = query
    const res = await deleteById([id])
    const newDataList = await selectByUser([userName])
    const body = { 'state_code': '0', schemaDataList: newDataList }
    ctx.body = body
})

router.post('/save', async ctx => {
    const { session } = ctx
    const { userName } = session
    const { request } = ctx
    const { schema, id } = request.body
    if (id === 'new') {
        try {
            const res = await getMaxId()
            const MaxId = res[0]['max(id)']
            const resData = await insterSchema([MaxId+1, userName, schema, `http://127.0.0.1:3001/${MaxId+1}`])
            ctx.body = { 'state_code': '0' }
        } catch (e) {
            ctx.body = { 'state_code': e }
        }
    } else {
        try {
            const res = await updateSchema([schema, id])
            ctx.body = { 'state_code': '0' }
        } catch (e) {
            ctx.body = { 'state_code': e }
        }
    }
})


module.exports = router
