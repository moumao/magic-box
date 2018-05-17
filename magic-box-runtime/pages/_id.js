import  Vue from 'vue';
import base from '~/components/common/base/index.vue'
import axios from 'axios'
import componentList from '~/components/components_list/index'
import domtoimage from 'dom-to-image';
import { componentFactory, distributeData, jsonToObjEscape} from '~/utils/utils.js'

export default Vue.component('componentFactory', {

    async asyncData({ params, error }) {
        try {
            const { id } = params;
            if( id === 'new' ) {
                return {
                    schema: {
                      baseData: {
                      		title: "",
                      		description: "",
                      		bg: ""
                      	},
                      	meta: {

                      	},
                      	components: null
                    }
                }
            }
            const { data } = await axios.get(`/api/schema/getById?id=${id}`)
            const { schemaDataList } = data
            const { schemaData } = schemaDataList
            return { schema: JSON.parse(schemaData)}
        } catch (e) {
            error({ message: 'Page not found', statusCode: 404 })
        }
    },

    created: function () {
        // console.log('a is: ' + this.schema)
    },

    mounted: function () {
        const receiveMessageFromIndex = event => {
            const { data, source } = event;
            if(data === 'saveImage') {
              const node = document.getElementById('page');
              domtoimage.toJpeg(node)
                .then(dataUrl => {
                    source.postMessage(dataUrl, '*')
                })
                .catch(error => {
                    console.error('oops, something went wrong!', error);
                });
              return
            }
            try {
                console.log(this.schema);
                this.schema = JSON.parse(data);
            } catch (e) {
                console.log('wrong data');
            }
        }
        window.addEventListener("message", receiveMessageFromIndex, false);
    },

    beforeUpdate: function () {
      //  console.log('beforeUpdate');
    },

    updated: function () {
      //  console.log('updated');
    },

    render: function (createElement) {
        // console.log('render');
        return createElement(
            base,
            distributeData(this.schema.baseData),
            componentFactory(createElement, this.schema.components, componentList)
        )
    }
})
