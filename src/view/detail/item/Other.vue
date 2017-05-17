<template>
<el-row>
  <el-col :span="8">
    <el-tag type="primary">是否开通期权交易权限</el-tag>
    <check-show :check="info.permissionOptions==1"></check-show>
  </el-col>
  <el-col :span="8" v-show="info.permissionOptions==1">
    <el-tag type="primary">交易年数</el-tag>
    {{info.tradingYearsOptions}}
  </el-col>

</el-row>
</template>
<script>
  export default {
    name: 'Other',
    props:['info','ticket']
  }
</script>
