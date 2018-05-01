<template>
  <div>
    vue ssr
    <nuxt-link to="/2222">Go to Foo</nuxt-link>
    <div @click="showToast">
      show
    </div>
    <div>
      {{ date }}
    </div>
    <timer/>
  </div>
</template>

<script>
import timer from '~/components/common/timer/index.vue'

export default {
  name: 'date',
  components: {
    timer
  },
  data () {
    return { date: Date.now() }
  },
  serverCacheKey () {
    return Math.floor(Date.now() / 10000)
  },
  methods: {
    showToast: function () {
      this.$toast('Hi, there!', {
        id: 'my-toast',
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000
      })
    }
  }
}
</script>

<style>

</style>
