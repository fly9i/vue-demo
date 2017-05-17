<template>
  <div class="image-view" @click="hideImage">
    <div class="image-background"></div>
    <div class="image-container">
      <transition name="el-zoom-in-center">
        <img :src="images[index]" v-show="imageShow"/>
      </transition>
    </div>
    <div class="image-controller" v-show="images.length>1">
      <button class="controller controller-left" @click="turn(-1)">
        <i class="el-icon-arrow-left"></i>
      </button>
      <button class="controller controller-right" @click="turn(1)">
        <i class="el-icon-arrow-right"></i>
      </button>
      <el-row type="flex" justify="center" class="indexer">
        <template v-for="idx in images.length">
          <div :class="{'index-flag':true,'current':(idx-1)==index,'not-current':(idx-1)!=index}"></div>
        </template>
      </el-row>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'ImageView',
    props: ['images', 'defaultIndex', 'hide'],
    data: function () {
      return {
        index: this.defaultIndex || 0,
        controller: false,
        imageShow: true,
      }
    },
    watch: {
      defaultIndex(value){
        this.index = value;
      }
    },
    methods: {
      turn(len){
        this.imageShow = false;
        var i = this.index + len;
        if (i == -1) {
          i = this.images.length - 1;
        }
        if (i == this.images.length) {
          i = 0;
        }
        this.index = i;
        this.imageShow = true;
      },
      hideImage(e){
        var c = e.target.tagName.toLowerCase();
        if (c == "i" || c == "button") {
          return;
        }
        this.hide && this.hide();
      }
    }
  }
</script>
<style>
  .image-view {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 999999999;
  }

  .image-background {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: #000000;
    filter: alpha(Opacity=70);
    -moz-opacity: 0.7;
    opacity: 0.7;
  }

  .image-container {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    text-align: center;
    overflow: hidden;
  }

  .image-controller {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
  }

  .controller {
    position: absolute;
    display: block;
    top: 50%;
    margin-top: 25px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    transform: translateY(-50%);
    text-align: center;
    font-size: 20px;
    background-color: #000000;
    color: #bfcbd9;
    border: 1px solid #000000;
    cursor: pointer;
    filter: alpha(Opacity=60);
    -moz-opacity: 0.6;
    opacity: 0.6;
    outline: none;
  }

  .controller-left {
    left: 30px;
  }

  .controller-right {
    right: 30px;
  }

  .image-container img {
    height: 100%;
    max-width: 95%;
  }

  .indexer {
    position: absolute;
    width: 100%;
    bottom: 0px;
    height: 40px;
    text-align: center;
  }

  .index-flag {
    display: block;
    width: 30px;
    height: 2px;
    margin-left: 2px;
    border: 1px solid #666666;
  }
  .current{
    background-color: #FFFFFF;
  }
  .not-current{
    background-color: gray;
  }
</style>
