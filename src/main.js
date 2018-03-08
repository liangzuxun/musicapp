// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import 'common/stylus/index.styl'
import VueResource from 'vue-resource'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import 'swiper/dist/js/swiper.js'
import VueLazyload from 'vue-lazyload'
import store from './store/index'
import 'font-awesome/css/font-awesome.css'
import axios from 'axios'
import '@/common/js/debounce'
/*eslint-disable no-unused-vars */
// import vConsole from 'vconsole'
// console.log('t4est')
Vue.prototype.$axios = axios

Vue.use(VueResource)
Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyload, {
  loading: ""
})
Vue.config.productionTip = false
fastclick.attach(document.body)

// const sess = window.sessionStorage
// Vue.mixin({
//   beforeRouteLeave:(to, from, next) => {
//     const toRoute = to.path
//     const fromRoute = from.path
//     const h = JSON.parse(sess.getItem(toRoute))
//     if (h && h.history) {
//       this.$destroy()
//       next()
//     } else {
//       next()
//     }
//     next()
//   }
// })
// const beforeEach = function (to, from, next) {
//   const toRoute = to.path
//   const fromRoute = from.path
//   let h = JSON.parse(sess.getItem(toRoute))
//   if (h && h.history) {
//     h.history = false
//     sess.removeItem(toRoute)
//   } else {
//     sess.setItem(fromRoute || '/', JSON.stringify({
//       history: true
//     }))
//   }
//   next()
// }
// router.beforeEach(beforeEach)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
