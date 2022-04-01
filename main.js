import App from './App'
import { $http } from '@escook/request-miniprogram'
import store from './store/index.js'
uni.$http = $http
// 配置请求根路径
$http.baseUrl = 'http://127.0.0.1:5000'
// 请求开始之前做一些事情
$http.beforeRequest = function (options) {
  uni.showLoading({
    title: '数据加载中...',
  })
}
uni.$showMsg =  (title = '数据加载失败！', duration= 1500)=> {
  uni.showToast({
    title,
    duration,
    icon: 'none',
  })
}
// 请求完成之后做一些事情
$http.afterRequest = function () {
  uni.hideLoading()
}
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif