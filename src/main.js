import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import "@/assets/css/reset.css"

// 回顾axios
// import axios from 'axios
// Vue.prototype.$http = axios
import MyServerHttp from '@/plugins/http.js'
Vue.use(MyServerHttp)

Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
