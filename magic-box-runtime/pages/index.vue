<template>
  <div>
    vue ssr
    <nuxt-link to="/2222">Go to Foo</nuxt-link>
    <div @click="showToast">
      show
    </div>
  </div>
</template>

<script>
export default {
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
