<template>
  <el-dialog :visible.sync="logVisible" @close="closeLog" title="操作日志" size="large">
    <log :ticketId="ticketId"></log>
  </el-dialog>
</template>
<script>
  import filters from '@/filter/filters';
  import DataExecptionHandler from '@/utils/DataExecptionHandler';
  import Log from '../detail/item/Log';
  import http from '@/http'
  import Qs from 'qs';
  export default {
    name: 'LogModalView',
    props: ['ticketId','logDialog','closeLog'],
    components:{Log},
    data:function () {
      return {
        log:[],
        logVisible:this.logDialog,
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
    filters:filters,
    watch:{
      logDialog(value){
        this.logVisible=value;
      }
    }
  }
</script>
<style>

</style>
