import moment from 'moment';
var iconMapper={
  '/ticket':'&#xe627;',
  '/user':'&#xf003e;',
  '/withdraw':'&#xe809;',
};
export default {
  iconFilter:function (value) {
    return iconMapper[value]||'';
  },
  timeFilter:function (value) {
    return moment(value).format('YYYY-MM-DD HH:mm:ss');
  },
  stateFilter:function (value) {
    switch (value){
      case 'START':
        return '开始'
      case 'PASS_1':
        return '初审通过';
      case 'REJECT_1':
        return '初审驳回';
      case 'ACCEPT_1':
        return '初审接单';
      case 'ACCEPT_2':
        return '复审接单';
      case 'REJECT_2':
        return '复审驳回';
      case 'MANUAL_SUB':
        return '待人工开户';
      case 'XML_SUB':
        return '待XML开户';
      case 'M_IB_CHECKING':
        return '人工开户-IB审核中';
      case 'X_IB_CHECKING':
        return 'XML开户-IB审核中';
      case 'CREATE':
        return '普通开户成功';
      case 'L_CREATE':
        return 'LINK开户成功';
      case 'PAUSE':
        return '暂停开户';
      case 'REJECT_1_LINK':
        return 'LINK开户初审驳回';
      case 'IB_PASS':
        return 'IB审核通过';
      case 'IB_REJECT':
        return 'IB驳回';
      case 'TAX_UPLOAD':
        return '税表待上传';
      case 'TERMINATE':
        return '终止开户';
      default:
        return '未知状态';
    }
  },
  yearFilter:function (value) {
    switch (value){
      case '1':
        return '1年';
      case '2':
        return '2年';
      case '3':
        return '3年';
      case '4':
        return '4年';
      case '5':
        return '5年';
      case '6':
        return '6-10年';
      case '10':
        return '大于10年';
      default:
        return '0年';
    }
  },
  maritalFilter(value){
    switch (value){
      case '0':
        return '未婚';
      case '1':
        return '已婚';
      case '2':
        return '离异';
      case '3':
        return '丧偶';
      default:
        return '未知'
    }
  },

  tradeTimesFilter(value){
    switch (value){
      case '0':
        return '小于100次';
      case '1':
        return '大于等于100次';
      default:
        return '未知';
    }
  },
  knowledgeFilter(value){
    switch (value){
      case '0':
        return '丰富';
      case '1':
        return '良好';
      default:
        return '未知';
    }
  }
}
