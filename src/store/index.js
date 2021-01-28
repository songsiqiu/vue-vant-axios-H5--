import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    index:0,
    badge:0
  },
  mutations: {
    changeIndex(state,index) {
      state.index = index
    },
    changeBadge(state,num){
      state.badge = num
    }
  },
  actions: {
  },
  modules: {
  }
})
