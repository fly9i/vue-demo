import http from "@/http";
import DataExecptionHandler from '@/utils/DataExecptionHandler';
export default {
  loadMenus: function (router,callback) {
    http.get('/path/tree').then(function (res) {
      callback && callback(res.data.data);
    }).catch(function (e) {
      callback && callback();
      DataExecptionHandler.handle(e,router);
    })
  },
  loadUser(router,callback){
    http.get('/user/current').then(function (res) {
      if(res.data.data){
        callback && callback(res.data.data);
      }else {
        console.log("加载用户信息失败。");
      }
    }).catch(function (e) {
      console.error(e);
      callback && callback();
      DataExecptionHandler.handle(e,router);
    })
  }
}
