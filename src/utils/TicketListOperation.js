import http from '@/http';
import Qs from 'qs';

var formConfig={headers: {'Content-Type': 'application/x-www-form-urlencoded'}};
export default function ticketListOperation(vue) {
  var vue=vue;
  this.view = function (row) {
    vue.dialog=true;
    vue.ticket={
      ticketId:row.ticketId,
      infoId:row.infoId
    };
  };
  this.edit = function (row) {
    vue.dialog=true;
    vue.ticket={
      ticketId:row.ticketId,
      infoId:row.infoId
    };
    console.log('edit')
  };
  this.accept=function (row) {
    var action='ACCEPT_1';
    var infoId=row.infoId;
    var reqData={action:action,infoId:infoId};
    var _self=this;
    http.post('/ticket/update',Qs.stringify(reqData),formConfig).then(function (res) {
      if(res.data && res.data.code && res.data.code=='42000000'){
        vue.$store.dispatch('toggleAlert',{title:'接单成功',type:'success',description:'初审接单成功,资料ID:'+infoId,status:true});
        vue.$store.dispatch('updateStateCount');
        vue.loadTickets();
        _self.edit(row);
      }else{
        var msg=res.data.msg?(','+res.data.msg):'';
        vue.$store.dispatch('toggleAlert',{title:'接单失败',type:'error',description:'初审接单失败'+msg,status:true});
      }
    }).catch(function (e) {
      var msg='';
      if(e.response && e.response.data && e.response.data.msg){
        msg=','+e.response.data.msg;
      }
      vue.$store.dispatch('toggleAlert',{title:'接单失败',type:'error',description:'初审接单失败'+msg,status:true});
      console.error(e);
    });
  };
  this.log=function (row) {
    console.log("row click,ticketId:"+row.ticketId);
    vue.clickedTicketId=row.ticketId;
    vue.logDialog=true;
  };
  this.check=function (row,index) {
    var action='ACCEPT_2';
    var infoId=row.infoId;
    var reqData={action:action,infoId:infoId};
    var _self=this;
    http.post('/ticket/update',Qs.stringify(reqData),formConfig).then(function (res) {
      if(res.data && res.data.code && res.data.code=='42000000'){
        vue.$store.dispatch('toggleAlert',{title:'接单成功',type:'success',description:'复审接单成功,资料ID:'+infoId,status:true});
        vue.$store.dispatch('updateStateCount');
        vue.loadTickets();
        _self.edit(row);
      }else{
        var msg=res.data.msg?(','+res.data.msg):'';
        vue.$store.dispatch('toggleAlert',{title:'接单失败',type:'error',description:'复审接单失败'+msg,status:true});
      }
    }).catch(function (e) {
      var msg='';
      if(e.response && e.response.data && e.response.data.msg){
        msg=','+e.response.data.msg;
      }
      vue.$store.dispatch('toggleAlert',{title:'接单失败',type:'error',description:'复审接单失败'+msg,status:true});
      console.error(e);
    });
  }
}
