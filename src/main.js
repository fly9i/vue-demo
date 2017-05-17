// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import NavBar from "./view/nav/NavBar";
import store from "./store";
import Alert from "./components/Alert";
import Loading from "./components/Loading";
import CheckShow from "./components/CheckShow";

store.dispatch('setRouter', router);
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.component('nav-bar', NavBar);
Vue.component('alert', Alert);
Vue.component('loading', Loading);
Vue.component('check-show', CheckShow);
router.beforeEach(function (to, from, next) {
  console.log(to.path);
  next()
});
router.afterEach(function (route) {
  if (route.meta.title) {
    document.title = '受理系统-' + route.meta.title;
  } else {
    document.title = '受理系统';
  }
});

/* eslint-disable no-new */
var vue = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App},
  store: store,
  data: {
    bus: new Vue(),
  },
  created(){

  }
});

