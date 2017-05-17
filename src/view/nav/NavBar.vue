<template>
  <el-row type="flex" align="middle" justify="center">
    <el-col :span="4" class="brand">
      <router-link to="/">客服系统</router-link>
    </el-col>
    <el-col :span="10">
      <el-menu theme="dark" :default-active="active" :router="router" class="menu-bar"
               mode="horizontal" menu-trigger="click">
        <template v-for="n in paths">
          <template v-if="n.paths && n.paths.length>0">
            <el-submenu :index="n.url">
              <template slot="title"><i class="iconfont" v-html="iconFilter(n.url)">{{n.url|iconFilter}}</i>
                {{n.name}}
              </template>
              <template v-for="subn in n.paths">
                <el-menu-item :index="subn.url">{{subn.name}}
                  <el-tag type="danger">{{countTicket(subn.url)}}</el-tag>
                </el-menu-item>
              </template>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index="n.url"><i class="iconfont" v-html="iconFilter(n.url)">{{n.url|iconFilter}}</i>
              {{n.name}}
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </el-col>
    <el-col :span="6">
      <el-row :span="24" type="flex" align="middle" justify="center" class="user-info">
        <img class="avatar" src="../../assets/avatar.jpg">&nbsp;
        <span>
          {{user.email}} <a href="javascript:;" @click='logout'>退出</a>
          </span>
      </el-row>
    </el-col>
    <el-col :span="4" class="search" align="center">
      <el-input placeholder="手机号/Email/U码/IB账号" icon="search" v-model="searchWord"
                :on-icon-click="handleSearch"></el-input>
    </el-col>
  </el-row>
</template>
<script>
  import filters from '@/filter/filters';
  import storage from '@/storage';
  import http from '@/http';
  export default{
    name: "NavBar",
    filters: filters,
    data: function () {
      return {
        show: true,
        router: true,
        searchWord: null,
      };
    },
    computed: {
      stateCount(){
        return this.$store.state.stateCount;
      },
      paths(){
        return this.$store.getters.menu;
      },
      active(){
        var path = this.$route.path;
        var urls = path.match(/\/[0-9a-zA-Z-]+/gi);
        var url = '';
        if (urls) {
          if( urls.length == 3) {
            url = urls[0]+urls[1];
          }else{
            for(var i=0;i<urls.length;i++) {
              url += urls[i];
            }
          }
        }
        return url;
      },
      user(){
        return this.$store.getters.user || {email: "test@example.com"};
      }
    },
    methods: {
      handleSearch: function () {

      },
      iconFilter: filters.iconFilter,
      countTicket: function (url) {
        return this.stateCount[url] || 0
      },
      logout(){
        console.log('logout')
        var _self=this;
        http.post('/logout').then(function () {
          storage.removeSession();
          _self.$router.push('/login')
        }).catch(function (e) {
          console.error(e)
        });
      }
    },
    watch: {
      '$route': function (to, from) {
      },
    }

  }
</script>
<style>
  .brand {
    font-weight: bold;
    font-size: 20px;
    text-align: center;
  }

  .search {
    padding-right: 10px;
  }

  .brand a {
    text-decoration: none;
    color: #bfcbd9;
  }

  @font-face {
    font-family: 'iconfont';
    src: url('../../assets/iconfont/iconfont.eot');
    src: url('../../assets/iconfont/iconfont.eot?#iefix') format('embedded-opentype'),
    url('../../assets/iconfont/iconfont.woff') format('woff'),
    url('../../assets/iconfont/iconfont.ttf') format('truetype'),
    url('../../assets/iconfont/iconfont.svg#iconfont') format('svg');
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-style: normal;
    font-size: 18px;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }

  .user-info {
    color: #bfcbd9;
  }
  .user-info a:link{
    color:#EFF2F7;
  }

  .user-info a:visited{
    color:#EFF2F7;
  }


  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 30px;
  }

</style>
