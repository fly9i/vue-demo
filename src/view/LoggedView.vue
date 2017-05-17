<template>
  <el-row>
    <el-row class="head-bar">
      <nav-bar></nav-bar>
    </el-row>
    <el-row>
      <transition name="el-zoom-in-center">
        <router-view></router-view>
      </transition>
    </el-row>
  </el-row>
</template>
<script>
  import data from '@/data';
  export default {
    name: 'Ticket',
    beforeCreate(){
      this.$store.dispatch('loading',true);
    },
    created(){

    }
  }
</script>
