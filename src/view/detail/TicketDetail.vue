<template>

  <el-row>
    <el-dialog :visible.sync="visible" @close="closeDetail" title="受理开户详情信息" size="full">
      <el-row type="flex" justify="center" class="detail-overview">
        <b><i class="el-icon-warning"></i> 受理单信息概览:</b>&nbsp;&nbsp;
        <span class="titile-info"><el-tag type="primary">申请单ID</el-tag> {{ticket.ticketId}} </span>&nbsp;&nbsp;
        <span class="titile-info"><el-tag type="primary">资料ID</el-tag> {{ticket.infoId}} </span>&nbsp;&nbsp;
        <span class="titile-info"><el-tag type="primary">手机号</el-tag> {{info.mobile}} </span>&nbsp;&nbsp;
        <span class="titile-info"><el-tag
          type="primary">状态</el-tag> {{ticket.state|stateFilter}} </span>&nbsp;&nbsp;
        <span class="titile-info"><el-tag type="primary">状态</el-tag> {{info.operationTime|timeFilter}} </span>&nbsp;&nbsp;
      </el-row>
      <el-row>
        <el-button-group>
          <el-button size="small" type="primary" @click="collapse=items">展开所有</el-button>
          <el-button size="small" type="primary" @click="collapse=[]">折叠所有</el-button>
        </el-button-group>
      </el-row>
      <el-row class="split"></el-row>
      <el-row class="detail-info">
        <el-col :span="24">
          <el-collapse v-model="collapse">
            <el-collapse-item title="基本信息" name="basic">
              <basic :ticket="ticket" :info="info"></basic>
            </el-collapse-item>
            <el-collapse-item title="个人信息" name="personal">
              <identity :ticket="ticket" :info="info" :imageClick="imageClick"></identity>
            </el-collapse-item>
            <el-collapse-item title="资产状况" name="assets">
              <assets :ticket="ticket" :info="info"></assets>
            </el-collapse-item>
            <el-collapse-item title="金融行业从业人员" name="finance">
              <finance :ticket="ticket" :info="info"></finance>
            </el-collapse-item>
            <el-collapse-item title="规管信息" name="regulate">
              <regulate :ticket="ticket" :info="info"></regulate>
            </el-collapse-item>
            <el-collapse-item title="家庭状况" name="family">
              <family :ticket="ticket" :info="info"></family>
            </el-collapse-item>
            <el-collapse-item title="投资信息" name="invest">
              <invest :ticket="ticket" :info="info"></invest>
            </el-collapse-item>
            <el-collapse-item title="其他交易品种" name="other">
              <other :ticket="ticket" :info="info"></other>
            </el-collapse-item>
            <el-collapse-item title="日志" name="log">
              <log :ticketId="ticketInfo.ticketId"></log>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row>
    </el-dialog>
    <image-view :images="images" :defaultIndex="imageIndex" v-show="imageShow"
                :hide="hideImage"></image-view>
  </el-row>
</template>
<script>
  import http from '@/http';
  import DataExecptionHandler from '@/utils/DataExecptionHandler';
  import filters from '@/filter/filters';
  import Basic from './item/Basic';
  import Identity from './item/Identity';
  import Assets from './item/Assets';
  import Finance from './item/Finance';
  import Family from './item/Family';
  import Invest from './item/Invest';
  import Regulate from './item/Regulate';
  import Other from './item/Other';
  import Log from './item/Log';
  import ImageView from '@/components/ImageView';

  export default{
    name: 'TicketDetail',
    props: ['ticketInfo', 'dialog', 'closeDetail'],
    components: {Basic, Identity, Assets, Finance, Family, Invest, Regulate, Other, Log, ImageView},
    data: function () {
      return {
        ticket: {},
        info: {},
        visible: this.dialog,
        items: ['basic', 'personal', 'assets', 'finance', 'regulate', 'family', 'invest', 'other'],
        collapse: ['basic', 'personal', 'assets', 'finance', 'regulate', 'family', 'invest',
          'other'],
        imageShow: false,
        imageIndex: 0,
        log: [],
      }
    },
    filters: filters,
    methods: {
      hideImage(){
        this.imageShow = false;
      },
      imageClick(index){
        this.imageIndex = index;
        this.imageShow = true;
      },
    },
    computed: {
      images(){
        var images = [];
        images.push(this.info.idCardFront);
        images.push(this.info.idCardBack);
        images.push(this.info.signaturePic);
        return images;
      }
    },
    watch: {
      dialog(value){
        this.visible = value;
        if (value) {
          this.$store.dispatch('loading', true);
          var _self = this;
          if (!this.ticketInfo) {
            this.$store.dispatch('loading', false);
            return;
          }
          http.post('/account/info', this.ticketInfo).then(function (res) {
            if (res.data.data) {
              _self.info = res.data.data.info;
              _self.ticket = res.data.data.ticket;
            }
            _self.$store.dispatch('loading', false);
          }).catch(function (e) {
            console.error("Fetch account info failed.");
            _self.$store.dispatch('loading', false);
            DataExecptionHandler.handle(e, _self.$router);
          });
        }
      }
    },
    created: function () {
    },
  }
</script>
<style>
  .detail-overview {
    font-size: 14px;
    margin-bottom: 10px;
    background-color: #F9FAFC;
  }

  .step-title {
    font-size: 12px;
  }

  .detail-info img {
    max-height: 400px;
    max-width: 100%;
  }

  .split {
    height: 10px;
  }

  .detail-info .el-row {
    margin-top: 5px;
  }
</style>
