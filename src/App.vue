<template>
  <el-row id="app" :gutter="10">
    <el-col :span="1" style="overflow: hidden">
      <nav-side></nav-side>
    </el-col>
    <el-col :span="20">
    <router-view></router-view>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  position: absolute;
  left:0px;
  top:0px;
  width: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>
