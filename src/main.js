import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import "@/assets/css/reset.css"
import moment from 'moment'
// 回顾axios
// import axios from 'axios
// Vue.prototype.$http = axios
import MyServerHttp from '@/plugins/http.js'
Vue.use(MyServerHttp)

Vue.config.productionTip = false
Vue.use(ElementUI)

// 全局过滤器
Vue.filter('fmdate', (v) => {
    return moment(v).format('YYYY-MM-DD');
})

/**
 * <el-table-column prop="create_time"
 label = "日期"
 width = "120" >
如果单元格内显示内容不是字符串(文本)
需要给被显示的内容外层包裹一个template

template内部要用数据设置slot-scope属性
该属性的值是要用数据的数据源

slot-scope 的值userlist其实就是el-table绑定的数据userlist
userlist.row-》数组中的每个对象
这里slot-scope后面等于的可以是其他，它依然回去上级找对应的数据将它赋值给后面等于的值
在2.6之后用v-slot代替slot-cope
</el-table-column>
 * 
 <el-table-column
 label = "日期"
 width = "120">
 <template slot-scope="userlist">{{userlist.row.create_time | fmdate}}</template>
</el-table-column>
*/

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
