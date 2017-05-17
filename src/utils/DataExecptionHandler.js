export default {
  handle(e,router){
    console.error(e);
    if(e.response && e.response.status==403){
      // localStorage.removeItem('_cs_token_');
      router.push('/login');
    }
  }
}
