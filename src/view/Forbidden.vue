<template>
  <el-row>
    <el-col :offset="1" :span="23">
      <h1>403:无权操作该页面,您可能已经登录超时，请重新登录</h1>
      <hr>
      <router-link to="/login">登录</router-link>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    name: 'forbidden',
    props: [],
    methods: {}
  }
</script>
<style>

</style>
