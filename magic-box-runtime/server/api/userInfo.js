const router = require('koa-router')()
const { query } = require('../util/db')

async function selectAllData(name) {
  const sql = `SELECT * FROM user WHERE name='${name}'`
  const dataList = await query(sql)
  return dataList
}

router.get('/getUserInfo', async (ctx) => {
  const ctx_query = ctx.query
  const { name } = ctx_query
  const dataList = await selectAllData(name)
  const body = dataList.length === 0 ? { 'err': 'no user'} : dataList[0]
  ctx.body = body
})

module.exports = router
