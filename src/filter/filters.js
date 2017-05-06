import moment from 'moment';
export default {
  timeFilter:function (value) {
    return moment(value).format('YYYY-MM-DD HH:mm:ss');
  },
  stateFilter:function (value) {
    switch (value){
      case 'START':
        return '开始'
      case 'ACCEPT_1':
        return '初审接单';
      default:
        return '未知状态';
    }
  }
}
