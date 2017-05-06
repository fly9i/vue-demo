<template>
  <div id="ticket-content">
    <el-row>
      <el-row class="content-head">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
    </el-row>
    <ticket-list :operation="operation"></ticket-list>
  </div>
</template>
<script>
  import TicketList from './TicketList';
  export default{
    components: {
      TicketList
    },
    data: function () {
      return {
        operation: {
          btnCheck: true,
          btnEdit: true,
        }
      }
    }
  }
</script>
<style>
  .content-head {
    background-color: #EFF2F7;
    height: 40px;
    margin-bottom: 10px;
    padding:15px;
  }
</style>
