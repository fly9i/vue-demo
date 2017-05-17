<template>
  <el-collapse-transition>
    <div class="alert" v-show="show">
      <el-alert
        :title="alertMsg.title"
        :type="alertMsg.type"
        :description="alertMsg.description"
        close-text="知道了"
        @close="close"
        :closable="false"
        show-icon>
      </el-alert>
    </div>
  </el-collapse-transition>
</template>
<script>
  export default{
    name: 'alert',
    props: ['alertInfo'],
    computed: {
      show: function () {
        return this.$store.getters.alert;
      },
      alertMsg: function () {
        return this.$store.getters.alertInfo || {};
      },
    },
    data:function () {
      return {
      }
    },
    methods: {
      close(){
        this.$store.dispatch('toggleAlert', {status: false});
      }
    },
    watch: {
      show: function (value) {
        if (value) {
          var _self = this;
          this.timeoutId=setTimeout(function () {
            _self.$store.dispatch('toggleAlert', {status: false});
          }, 3000);
        }
      }
    }
  }
</script>
<style>
  .alert {
    position: fixed;
    width: 600px;
    top: 0px;
    left: 50%;
    margin-left: -300px;
    z-index: 99999999;
  }
</style>
