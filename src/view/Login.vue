<template>
  <div id="login">
    <div class="login-form">
      <el-row type="flex" justify="center">
        <h1>飞虎期货受理系统</h1>
        <br>
      </el-row>
      <el-row>
        <el-row>
          <el-col :span="16" :offset="4">
            用户名邮箱
            <el-input placeholder="用户名邮箱" v-model="email">
            </el-input>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="16" :offset="4">
            密码
            <el-input type="password" placeholder="密码" v-model="password">
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16" :offset="4">
            <el-button type="primary" @click="login">登录</el-button>
          </el-col>
        </el-row>
      </el-row>
    </div>
  </div>
</template>
<script>
  import http from '@/http';
  import Qs from 'qs';
  export default {
    name: 'Login',
    data: function () {
      return {
        email: '',
        password: '',
      }
    },
    methods: {
      login(){
        var _self = this;
        http.post('/login', Qs.stringify({email: this.email, password: this.password}),
          {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (res) {
          if (res.data.code && res.data.code == '42000000') {
            if (res.data.data) {
              window.localStorage['_cs_token_'] = res.data.data.token;
              http.defaults.headers.common['Authorization'] = res.data.data.token;
              if(res.data.data.user) {
                _self.$store.dispatch('loadUser', res.data.data.user);
              }
              _self.$store.dispatch('updateStateCount');
              _self.$router.push('/')
            }
          }
        }).catch(function (e) {
          console.error("登录失败")
          console.error(e);
          if (e.response && e.response.data && e.response.data.msg) {
            alert(e.response.data.msg)
          }
        })
      }
    },
    created(){
      console.log('test login')
      this.$store.dispatch('loading', false)
    }
  }
</script>
<style>
  #login {
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
  }

  .login-form {
    position: absolute;
    width: 500px;
    left: 50%;
    margin-left: -250px;
    top: 100px;
    border: 1px solid gray;
    padding: 30px;
    border-radius: 10px;
  }

  .login-form .el-row {
    margin-top: 12px;
  }

  .el-input {
    margin-top: 5px;
  }
</style>
