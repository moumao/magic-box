<template>
  <div class="btn-default">
    <slot>{{ innerText || text }}</slot>
  </div>
</template>

<script>

export default {
  props: ['innerText'],
  data: function () {
     return {
         text: '按钮'
       }
  }
}
</script>

<style>
.btn-default{
  border-radius: 2px;
  color: rgb(255,255,255);
  width: 70px;
  height: 30px;
  background-color: rgb(61,102,85);
  margin: 5px auto;
  text-align: center;
  line-height: 30px;
}
</style>
