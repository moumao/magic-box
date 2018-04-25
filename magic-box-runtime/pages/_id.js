import  Vue from 'vue';
import base from '~/components/common/base/index.vue'
import axios from 'axios'
import componentList from '~/components/components_list/index'
import { getMockSchema, componentFactory, distributeData } from '~/utils/utils.js'

export default Vue.component('componentFactory', {
  validate({ params }) {
    return !isNaN(+params.id)
  },

  async asyncData({ params, error }) {
    try {
      const { id } = params;
      const { data } = await axios.get(`http://127.0.0.1:3001/api/schema/getById?id=${id}`)
      return { schema: data }
    } catch (e) {
      error({ message: 'Page not found', statusCode: 404 })
    }
  },

  render: function (createElement) {
    const { components, baseData } = this.schema;
    return createElement(
      base,
      distributeData(baseData),
      componentFactory(createElement, components, componentList)
    )
  }
})
