import  Vue from 'vue';
import base from '~/components/common/base/index.vue'
import componentList from '~/components/components_list/index'
import { getMockSchema, componentFactory } from '~/utils/utils.js'

export default Vue.component('componentFactory', {
  validate({ params }) {
    return !isNaN(+params.id)
  },
  async asyncData({ params, error, query, isServer }) {
    try {
      const { id } = params;
      const { data } = await getMockSchema(id);
      return { schema: data }
    } catch (e) {
      error({ message: 'Page not found', statusCode: 404 })
    }
  },
  render: function (createElement) {
    const { components } = this.schema;
    console.log(componentFactory(createElement, components, componentList));
    return createElement(
      base,
      {},
      componentFactory(createElement, components, componentList)
    )
  }
})
