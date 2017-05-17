export default {
  save(key, value){
    window.localStorage[key] = value;
  },
  remove(key){
    window.localStorage.removeItem(key);
  },
  saveSession(value){
    window.localStorage['_cs_token_']=value;
  },
  removeSession(){
    window.localStorage.removeItem('_cs_token_');
  },
  getSession(){
    return window.localStorage['_cs_token'];
  }
}
