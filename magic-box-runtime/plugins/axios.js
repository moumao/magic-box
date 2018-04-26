import axios from 'axios'

export default ({ app, store, redirect }) => {
  // 服务端渲染需要完整的url
  if (process.server) {
    axios.defaults.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3001}`
  }
}
