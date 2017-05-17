<template>
  <el-row>
    <el-table :data="log" border style="width:100%">
      <el-table-column prop="email" label="操作人" width="250"></el-table-column>
      <el-table-column prop="opType" :formatter="opTypeFilter" label="操作类型" width="100"></el-table-column>
      <el-table-column prop="lastState" :formatter="stateFilter" label="操作前状态" width="120"></el-table-column>
      <el-table-column prop="currentState" :formatter="stateFilter" label="操作后状态" width="120"></el-table-column>
      <el-table-column prop="operationTime" :formatter="timeFilter" label="操作时间" width="200"></el-table-column>
      <el-table-column prop="comment" label="备注信息"></el-table-column>
    </el-table>
  </el-row>
</template>
<script>
  import http from '@/http';
  import Qs from 'qs';
  import filters from '@/filter/filters';
  export default {
    name: 'Log',
    props: ['ticketId'],
    methods: {},
    data:function () {
      return {
        log:[],
      }
    },
    methods: {
      opTypeFilter(row,col){
        if(row.opType=='STATE'){
          return '状态操作';
        }else{
          return '普通操作';
        }
      },
      timeFilter(row, col){
        return filters.timeFilter(row.operationTime);
      },
      stateFilter(row, col){
        return filters.stateFilter(row[col.property]);
      }
    },
    watch:{
      ticketId(value){
        var _self=this;
        http.get('/operation/log?'+Qs.stringify({'ticketId':value})).then(function (res) {
          if(res.data.data){
            _self.log=res.data.data;
            console.log(res.data.data)
          }
        }).catch(function (e) {
          DataExecptionHandler.handle(e,_self.$router);
        })
      }
    }
  }
</script>
<style>

</style>
