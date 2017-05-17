var urlConfigMapper={
  default:{
    view:true,
    log:false,
    edit:false,
    accept:false
  },
  '/ticket/review/step1':{
    view:true,
    log:true,
    accept:true,
  },
  '/ticket/review/step2':{
    view:true,
    log:true,
    edit:true
  },
  '/ticket/review/step1_1':{
    view:true,
    log:true,
    check:true
  }
};

export default {
  getOperations(url){
    return urlConfigMapper[url]||urlConfigMapper.default;
  }
}
