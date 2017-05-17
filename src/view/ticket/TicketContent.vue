<template>
  <el-row>
    <el-row>
      <el-tabs v-model="tabActive" @tab-click="tabClick" type="border-card" addable
               @tab-remove="tabRemove">
        <template v-for="tab in tabs">
          <el-tab-pane :closable="tab.closable" :type="tab.type" :name="tab.name"><span
            slot="label">{{tab.label}} <el-tag
            type="danger" v-show="!tab.hideTag">{{showCount(tab.name)}}</el-tag></span>
          </el-tab-pane>
        </template>
      </el-tabs>
    </el-row>
    <transition name="el-zoom-in-center">
      <router-view></router-view>
    </transition>
  </el-row>
</template>
<script>
  import filters from '@/filter/filters';
  import TicketDetail from '@/view/detail/TicketDetail'
  import http from '@/http'
  import DataExecptionHandler from '@/utils/DataExecptionHandler';
  export default{
    name: 'TicketContent',
    components: {
      TicketDetail
    },
    props: [],
    data: function () {
      return {
        haveData: true,
        tabs: [],

        ticketList: [],
        addTicketView: false,

      }
    },
    methods: {
      tabClick(tab){
        if (tab.name.indexOf('AddTicketView') == -1) {
          this.$router.push(tab.name);
        }
//        this.tabActive=tab.name;
        this.$store.dispatch('updateTabActive', tab.name);
      },
//      tabChange(tabName){
//        console.log('change to ' + tabName)
//        var ticketView = tabName.indexOf('AddTicketView') == 0 ? true : false;
//        this.addTicketView = ticketView;
//      },
      tabRemove(){
        var tab = null;
        for (var i in this.tabs) {
          if (this.tabs[i].name == 'AddTicketView') {
            this.tabs.splice(i, 1);
            break;
          }
        }
        if (this.tabActive == 'AddTicketView') {
          this.$store.dispatch('updateTabActive', this.tabs[this.tabs.length - 1].name);
        }
      },
      tabAdd(label){
        this.tabs.push({
          label: label,
          name: 'AddTicketView',
          hideTag: true,
          closable: true
        });
        this.$store.dispatch('updateTabActive', 'AddTicketView');
      },
      tabReplace(label){
        for (var i in this.tabs) {
          if (this.tabs[i].name == 'AddTicketView') {
            this.tabs.splice(i, 1);
            break;
          }
        }
        this.tabAdd(label);
      },
      loadTicketDetail(ticket){
        var _self = this;
        setTimeout(function () {
        }, 1000)
      },

      loadTickets(url, callback){
        var _self = this;
        http.post('/ticket', {url: url}).then(function (res) {
          if (res.data.data && res.data.data.length > 0) {
            _self.ticketList = res.data.data;
            _self.haveData = true;
          } else {
            _self.haveData = false;
          }
          callback && callback();
        }).catch(function (e) {
          _self.haveData = false;
          DataExecptionHandler.handle(e, _self.$router)
        });
      },

      timeFilter(row, col){
        return filters.timeFilter(row.operationTime);
      },
      stateFilter(row, col){
        return filters.stateFilter(row.state);
      },
      view(row){
        //this.$store.dispatch('toggleAlert',{status:true,title:'这是一条提示',type:'success'})
        this.tabReplace('AddTicketView', '申请-' + row.mobile)
      },
      showCount(name){
        return this.stateCount[name] || 0;
      },
      changeTabs(p){
        var current = this.$route.path.match(/^\/[0-9a-zA-Z-]+\/[0-9a-zA-Z-]+/gi);
        var tabs = [];
        for (var i in p) {
          if (p[i].url == current[0]) {
            var ps = p[i].paths;
            if (ps && ps.length > 0) {
              for (var j in ps) {
                tabs.push({
                  label: ps[j].name,
                  name: ps[j].url
                })
              }
            }
            break;
          }
        }
        this.tabs = tabs;
        this.tabActive = tabs[0].name;
        if (/^\/[0-9a-zA-Z-]+\/[0-9a-zA-Z-]+$/gi.test(this.$route.path)) {
          this.$router.push(tabs[0].name);
        }
      }
    },
    computed: {
      stateCount(){
        return this.$store.state.stateCount
      },
      paths(){
        return this.$store.getters.menu[0];
      },
      tabActive(){
        return this.$store.getters.tabActive || this.$route.path;
      }
    },
    watch: {
      tabActive(value) {
        if (/^\/[0-9a-zA-Z-]+\/[0-9a-zA-Z-]+\/[0-9a-zA-Z-]+$/gi.test(this.$route.path)) {
          console.log('tab active change.value:' + value);
          //this.tabChange(value);
        }

      },
      paths(value){
        if (value) {
          this.changeTabs(value.paths)
        }
      },
      '$route'(to){
        this.changeTabs(this.paths.paths)
        this.$store.dispatch('updateTabActive', to.path);
      }
    },
    created(){
      if (this.paths && this.paths.paths) {
        this.changeTabs(this.paths.paths)
      }
      this.$store.dispatch('updateTabView', this);
    }
  }
</script>
<style>
  .menu-side {
    background-color: #324157;
  }

  .el-tabs__content, .el-tabs__new-tab {
    display: none;
  }
</style>
