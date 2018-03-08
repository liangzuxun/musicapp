import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as getters from './getter'
import mutations from './mutation'
import * as actions from './action'

Vue.use(Vuex)
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
// 热重载
if (module.hot) {
  module.hot.accept([
    './getter',
    './action',
    './mutation'
  ], () => {
    store.hotUpdate({
      getters: require('./getter').default,
      actions: require('./action').default,
      mutations: require('./mutation').default
    })
  })
}
export default store
