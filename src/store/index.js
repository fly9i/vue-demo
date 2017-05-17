import Vue from "vue";
import Vuex from "vuex";
import http from "@/http";
import DataExecptionHandler from "@/utils/DataExecptionHandler";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    stateCount: {},
    alert: false,
    alertInfo: {},
    tabView: {},
    menu: [],
    loading: false,
    loadingTime: Date.now(),
    tabActive: '',
    router: {},
    user:{},
  },
  mutations: {
    UPDATE_STATE_COUNT(state, stateCount){
      state.stateCount = stateCount;
    },
    TOGGLE_ALERT(state, alertMsg){
      if (alertMsg && typeof alertMsg.status !== 'undefined') {
        if (alertMsg.status) {
          state.alertInfo = alertMsg;
        }
        state.alert = alertMsg.status;
      } else {
        if (!state.alert) {
          state.alertInfo = alertMsg;
        }
        state.alert = !state.alert;
      }
    },
    UPDATE_TAB_VIEW(state, tabView){
      state.tabView = tabView;
    },
    LOAD_MENU(state, menu){
      state.menu = menu;
    },
    LOADING(state, loading){
      state.loading = loading;
      if (loading) {
        state.loadingTime = Date.now();
      }
    },
    UPDATE_TAB_ACTIVE(state, active){
      state.tabActive = active;
    },
    SET_ROUTER(state, router){
      state.router = router;
    },
    LOAD_USER(state,user){
      state.user=user;
    }
  },
  actions: {
    updateStateCount({commit, state}){
      http.get('/ticket/count').then(function (res) {
        if (res.data.data) {
          commit('UPDATE_STATE_COUNT', res.data.data);
        }
      }).catch(function (e) {
        DataExecptionHandler.handle(e, state.router);
      })
    },
    toggleAlert({commit}, alertMsg){
      commit('TOGGLE_ALERT', alertMsg);
    },
    updateTabView({commit}, tabView){
      commit('UPDATE_TAB_VIEW', tabView);
    },
    loadMenu({commit}, menu){
      commit('LOAD_MENU', menu);
    },
    loading({commit, state}, loading){
      var now = Date.now();
      if (loading) {
        commit('LOADING', loading)
      } else {
        if (now - state.loadingTime < 200) {
          setTimeout(function () {
            commit('LOADING', false);
          }, 200 - (now - state.loadingTime));
        } else {
          commit('LOADING', false);
        }
      }
    },
    updateTabActive({commit}, active){
      commit('UPDATE_TAB_ACTIVE', active);
    },
    setRouter({commit}, router){
      commit('SET_ROUTER', router);
    },
    loadUser({commit},user){
      commit('LOAD_USER',user);
    }
  },
  getters: {
    stateCount(state){
      return state.stateCount;
    },
    alertInfo(state){
      return state.alertInfo;
    },
    alert(state) {
      return state.alert;
    },
    tabView(state){
      return state.tabView;
    },
    menu(state){
      return state.menu;
    },
    loading(state){
      return state.loading;
    },
    tabActive(state){
      return state.tabActive;
    },
    user(state){
      return state.user;
    }
  }
})

