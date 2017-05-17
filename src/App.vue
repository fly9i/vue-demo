<template>
  <div id="app">
    <alert></alert>
    <router-view></router-view>
    <loading v-show="loading"></loading>
  </div>
</template>

<script>
  import data from '@/data';
  import http from '@/http';
  export default {
    name: 'app',
    computed: {
      loading(){
        return this.$store.getters.loading;
      },
    },
    methods:{
      loadData(){
        var _self=this;
        var menu=this.$store.getters.menu;
        if(menu && menu.length>0){
          this.$router.push(menu[0].url);
          return ;
        }
        data.loadUser(this.$router,function (user) {
          _self.$store.dispatch('loadUser',user);
        });
        data.loadMenus(this.$router,function (data) {
          if(data){
            _self.$store.dispatch('loadMenu',data);
            var url='';
            if(data[0].paths && data[0].paths.length>0){
              url=data[0].paths[0].url;
            }else{
              url=data[0].url;
            }
            _self.$router.addRoutes([
              {
                path:'/',
                redirect:url
              }
            ]);
            _self.$store.dispatch('updateStateCount');
          }
          _self.$store.dispatch('loading',false);
        });
      }
    },
    created(){
      var token=window.localStorage['_cs_token_'];
      console.log('create token:'+token)
      if(this.$route.path!='/login') {
        if (!token) {
          this.$router.push("/login");
        } else {
          http.defaults.headers.common['Authorization'] = token;
          this.loadData();
        }
      }
    },
    watch:{
      $route(to,from){
        if(to.path=='/' && to.path!='/login'){
          var token=window.localStorage['_cs_token_'];
          console.log("token:"+token);
          if(!token){
            this.$router.push("/login");
          }else{
            http.defaults.headers.common['Authorization'] = token;
            this.loadData();
          }
        }
      }
    }

  }
</script>

<style>
  @import "assets/element/index.css";

  #app {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
  }

  .head-bar {
    background-color: #324157;
    color: #bfcbd9;
  }

  i.success {
    color: #13CE66;
  }

  i.primary {
    color: #20A0FF;
  }

  i.warning {
    color: #F7BA2A;
  }

  i.danger {
    color: #FF4949;
  }

  .fade-leave-active {
    transition: opacity 1s
  }

  .fade-enter-active {
    transition: opacity 1s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0
  }
</style>
