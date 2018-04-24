<template>
  <div class="btn-default">
    <slot>按钮</slot>
  </div>
</template>

<script>

export default {

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
