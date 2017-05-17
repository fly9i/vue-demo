<template>
<el-row>
  <el-col :span="8">
    <el-tag type="primary">家庭成员个数</el-tag>
    {{info.familyNumber}}
  </el-col>
  <el-col :span="8">
    <el-tag type="primary">婚姻状况</el-tag>
    {{info.maritalStatus|maritalFilter}}
  </el-col>
  <el-col :span="8">

  </el-col>
</el-row>
</template>
<script>
  import filters from '@/filter/filters';
  export default {
    name: 'Family',
    props:['info','ticket'],
    filters:filters
  }
</script>
