<template>
  <el-row>
    <el-col :span="6">
      <el-tag type="primary">净资产</el-tag>
      {{info.netAssets}}美元
    </el-col>
    <el-col :span="6">
      <el-tag type="primary">净流动资产</el-tag>
      {{info.liquidAssets}}美元
    </el-col>
    <el-col :span="6">
      <el-tag type="primary">净年收入</el-tag>
      {{info.annualAssets}}美元
    </el-col>
    <el-col :span="6">
      <el-tag type="primary">总资产</el-tag>
      {{info.totalAssets}}美元
    </el-col>
  </el-row>
</template>
<script>
  export default {
    name: 'Assets',
    props:['info','ticket']
  }
</script>
