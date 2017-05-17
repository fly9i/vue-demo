<template>
  <el-row>
    <log-dialog-view :ticketId="clickedTicketId" :logDialog="logDialog" :closeLog="closeLog"></log-dialog-view>
    <ticket-detail :ticketInfo="ticket" :dialog="dialog" :closeDetail="closeDetail"></ticket-detail>
    <transition name="el-zoom-in-center">
      <el-table :data="ticketList" stripe border width="100%" class="ticket-list-table"
                v-show="haveData">
        <el-table-column
          prop="infoId"
          label="资料ID"
          width="290">
        </el-table-column>
        <el-table-column
          prop="ticketId"
          label="申请单ID"
          width="310">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号"
          width="130">
        </el-table-column>
        <el-table-column
          prop="state"
          :formatter="stateFilter"
          label="最新状态">
        </el-table-column>
        <el-table-column
          prop="operationTime"
          label="状态更新时间"
          :formatter="timeFilter"
          width="180">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="180">
          <template scope="scope">
            <el-button-group>
              <el-button type="primary" size="small" v-show="operation.view"
                         @click="ticketOperation.view&&ticketOperation.view(scope.row,scope.$index)">查看
              </el-button>
              <el-button type="primary" size="small" v-show="operation.edit"
                         @click="ticketOperation.edit&&ticketOperation.edit(scope.row,scope.$index)">编辑
              </el-button>
              <el-button type="primary" size="small" v-show="operation.accept"
                         @click="ticketOperation.accept&&ticketOperation.accept(scope.row,scope.$index)">领取
              </el-button>
              <el-button type="primary" size="small" v-show="operation.check"
                         @click="ticketOperation.check&&ticketOperation.check(scope.row,scope.$index)">领取
              </el-button>
              <el-button type="primary" size="small" v-show="operation.log"
                         @click="ticketOperation.log&&ticketOperation.log(scope.row,scope.$index)">日志
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </transition>

    <transition name="el-zoom-in-center">
      <div class="no-data" v-show="!haveData">未查询到数据,请刷新重试</div>
    </transition>
  </el-row>
</template>
<script>
  import http from '@/http'
  import filters from '@/filter/filters';
  import OperationConfig from '@/utils/OperationConfig';
  import TicketListOperation from '@/utils/TicketListOperation';
  import TicketDetail from '@/view/detail/TicketDetail';
  import LogDialogView from '@/view/ticket/LogDialogView';
  import DataExecptionHandler from '@/utils/DataExecptionHandler';
  export default {
    name: 'Test',
    components:{TicketDetail,LogDialogView},
    methods: {
      timeFilter(row, col){
        return filters.timeFilter(row.operationTime);
      },
      stateFilter(row, col){
        return filters.stateFilter(row.state);
      },
      loadTickets(url){
        var _self = this;
        this.haveData=false;
        this.$store.dispatch('loading', true);
        if(!url){
          url=this.$route.path;
        }
        http.post('/ticket', {url: url}).then(function (res) {
          if (res.data.data && res.data.data.length > 0) {
            _self.ticketList = res.data.data;
            _self.haveData = true;
          } else {
            _self.ticketList = [];
            _self.haveData = false;
          }
          _self.$store.dispatch('loading', false);
        }).catch(function (e) {
          _self.ticketList = [];
          _self.haveData = false;
          _self.$store.dispatch('loading', false);
          DataExecptionHandler.handle(e,_self.$router)
        });
      },
      closeDetail(){
        this.dialog=false;
      },
      closeLog(){
        this.logDialog=false;
      }
    },
    data: function () {
      return {
        ticketList: [],
        haveData: false,
        ticketOperation:new TicketListOperation(this),
        ticket:{},
        dialog:false,
        logDialog:false,
        clickedTicketId:'',
      }
    },
    computed:{
      operation(){
        return OperationConfig.getOperations(this.$route.path)||{view:true}
      }
    },
    watch: {
      '$route': function (to, from) {
        this.loadTickets(to.path)
      }
    },
    created(){
      this.loadTickets(this.$route.path);
    }

  }
</script>
<style>
  .no-data {
    color: #8391a5;
    width: 100%;
    text-align: center;
  }
</style>
