<template>
  <el-row>
    <el-row>
      <el-col :span="24">
        <span>是否需要向您的雇主发送账单，如果选择是，需要您的雇主合规部门确认邮件</span>
        <!--<i class="el-icon-circle-check success" v-if="info.isEmployerConfirm==1"></i>-->
        <!--<i class="el-icon-circle-close danger" v-else></i>-->
        <check-show :check="info.isEmployerConfirm==1"></check-show>
      </el-col>
    </el-row>
    <el-row v-show="info.isEmployerConfirm==1">
      <el-col :span="12">
        <el-tag type="primary">雇主合规部门邮箱</el-tag>
        {{info.twsUsername}}
      </el-col>
      <el-col :span="12">
        <el-tag type="primary">雇主合规部门电话</el-tag>
        {{info.email}}
      </el-col>
    </el-row>
  </el-row>
</template>
<script>
  export default {
    name: 'Finance',
    props: ['info', 'ticket']
  }
</script>
