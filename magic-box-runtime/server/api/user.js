const router = require('koa-router')()
const { query } = require('../util/db')

const selectUser = async value => {
  const sql = `SELECT * FROM user WHERE name=?`
  const dataList = await query(sql, value)
  return dataList
}

const insterUser = async value => {
  const sql = `insert into user (name, password, header) values (?,?,?)`
  const dataList = await query(sql, value)
  return dataList
}

router.get('/getUserInfo', async ctx => {
  const session = ctx.session
  const { userName, isLogin } = session
  const dataList = await selectUser([userName])
  const body = dataList.length === 0 ? { 'state_code': 'no such user' } : { userInfo: dataList[0], 'state_code': '0' }
  ctx.body = body
})

router.get('/login', async ctx => {
  const ctxQuery = ctx.query
  const { userName, password, remember } = ctxQuery
  const dataList = await selectUser([userName])
  if ( dataList.length !== 0 && remember) {
    ctx.session = {
      userName,
      isLogin: true
    }
  }
  const body = dataList.length === 0
    ? { 'state_code': 'no such user' }
    : dataList[0]['password'] === password
      ? { userInfo: dataList[0], 'state_code': '0' }
      : { 'state_code': 'password is wrong' }
  ctx.body = body
})

router.get('/signIn', async ctx => {
  const ctxQuery = ctx.query
  const { userName, password } = ctxQuery
  const ownList = await selectUser([userName])
  if (ownList.length > 0) {
    ctx.body = { 'state_code': 'user is already sign in' }
    return
  }
  const dataList = await insterUser([userName, password, 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'])
  ctx.session = {
    userName,
    isLogin: true
  }
  ctx.body = {
    userInfo: {
      'name': userName,
      'header': 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
    },
    'state_code': '0'
  }
})

module.exports = router
