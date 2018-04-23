import  Vue from 'vue';
import components from '../components/components_list/index'
export default Vue.component('componentFactory', {
  validate({ params }) {
    return !isNaN(+params.id)
  },
  async asyncData({ params, error, query, isServer }) {
    try {
      // const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${+params.id}`)
      return { name: params.id, username: params.id, email: params.id }
    } catch (e) {
      error({ message: 'User not found', statusCode: 404 })
    }
  },
  render: function (createElement) {
    console.log(this.name, components);
    return createElement(
      'h1',
      [
        createElement(components.button, {
          style: {
            color: 'red',
            fontSize: '14px'
          },
        }, 'vue ssr'),

      ]
    )
  }
})
