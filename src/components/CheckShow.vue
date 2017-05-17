<template>
  <span>
    <i class="el-icon-circle-check success" v-if="check"></i>
    <i class="el-icon-circle-close danger" v-else></i>
  </span>
</template>
<script>
  export default {
    name: 'CheckShow',
    props: ['check'],
    methods: {}
  }
</script>
<style>

</style>
