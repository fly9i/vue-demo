<template>
  <div class="nav-side">
  <el-row class="tac" v-show="show">
    <el-col :span="24">
      <el-menu default-active="2" router="router" class="side-menu" @open="handleOpen"
               @close="handleClose">
        <el-row class="search">
          <el-col :span="20">
            <el-input placeholder="输入手机号等" icon="search" :on-icon-click="search"
                      v-model="searchWord"></el-input>
          </el-col>
          <el-col :span="4"></el-col>
        </el-row>
        <template v-for="n in nav">
          <template v-if="n.nav && n.nav.length>0">
            <el-submenu :index="n.url">
              <template slot="title"><i class="el-icon-menu"></i>{{n.name}}</template>
              <template v-for="subn in n.nav">
                <el-menu-item :index="subn.url">{{subn.name}}
                </el-menu-item>
              </template>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index="n.url"><i class="el-icon-menu"></i>{{n.name}}</el-menu-item>
          </template>
        </template>
      </el-menu>
    </el-col>
  </el-row>
  </div>
</template>
<script>
  import $ from 'jquery';
  export default {
    name: 'NavSide',
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      search(){
        console.log(this.searchWord)
      }
    },
    data: function () {
      return {
        show: true,
        router: true,
        searchWord: '',
        nav: [
          {
            name: "开户管理",
            url: "/",
            nav: [
              {
                name: "待审核",
                url: "/ticket/review",
                nav: [
                  {name: "待领取"}, {name: "复审待领取"}, {name: "待初审"}, {name: "待复审"}
                ]
              },
              {
                name: "开户上传",
                url: "/ticket/upload",
                nav: []
              },
              {
                name: "开户成功",
                url: "/ticket/success",
                nav: []
              },
              {
                name: "开户失败",
                url: "/ticket/failed",
                nav: []
              },
              {
                name: "用户处理",
                url: "/ticket/process",
                nav: []
              },
              {
                name: "挂起",
                url: "/ticket/suspend",
                nav: []
              }
            ]
          },
          {name: "用户管理", url: "/user"}
        ]
      }
    }
  }
</script>
<style>
  .center {
    text-align: center;
  }

  .search {
    padding: 5px;
  }

  .tac {
    background-color: #eef1f6;
  }
</style>
