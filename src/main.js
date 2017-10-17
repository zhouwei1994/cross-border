// src/main.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueI18n from 'vue-i18n'
import i18n from './service/language/i18n.js'
//引用配置相关
import '@/config/rem'
import {
  routerMode
} from '@/config/env'
import routes from '@/router/router'
import store from '@/config/store'
import common from "@/service/model/common"
import * as $public from "@/service/model/public"
import LazyLoad from '@/service/model/lazyLoad.js'
//引用组件
//注册两个插件
Vue.config.productionTip = false;
// Vue.use(VueI18n)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(common)
Vue.use(LazyLoad);
Vue.use(VueAwesomeSwiper)
import '@/service/model/validation'
const router = new VueRouter({
  routes, // （缩写）相当于 routes: routes
  mode: routerMode,
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})
//把路由消息通过vuex传递到主页面
router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {
    isLoading: true
  })
  store.commit('setPath',to.path)
  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})
router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {
    isLoading: false
  })
})
window.$Vue = new Vue({
  router,
  store,
  i18n
}).$mount('#app');
//store获取本地默认数据
$Vue.storeAsny(['userinfo', 'indexSliderimgList', 'login','locale','exchangeRate'], true);
