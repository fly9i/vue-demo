<template>
<el-row>
  <el-col :span="8">
    <el-tag type="primary">IB账号</el-tag>
    {{info.brokerAccount}}
  </el-col>
  <el-col :span="8">
    <el-tag type="primary">IB用户名</el-tag>
    {{info.twsUsername}}
  </el-col>
  <el-col :span="8">
    <el-tag type="primary">Email</el-tag>
    {{info.email}}
  </el-col>
</el-row>
</template>
<script>
  export default {
    name: 'Basic',
    props:['info','ticket']
  }
</script>
