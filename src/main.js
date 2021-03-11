// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import Qs from 'qs'
import * as echarts from 'echarts'
import store from './store/vuex.js'

// 导入全局样式表
import './assets/css/globe.css'
Vue.config.productionTip = false
Vue.use(Element)
Vue.prototype.$echarts = echarts
Vue.prototype.qs = Qs
Vue.prototype.$http = axios
Vue.prototype.$store = store
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'
axios.defaults.withCredentials = true;
/* eslint-disable no-new */

new Vue({
  el: '#app',
  vm:new Vue(),
  router,
  components: { App },
  template: '<App/>'
})

