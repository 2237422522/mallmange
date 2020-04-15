# houtai

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

项目准备element-ui 安装引入
element-ui是饿了吗开发团队
适用于vue项目-pc端项目
在main.js中引入

项目准备 element-ui安装引入
npm i element-ui -S
在main.js import
Vue.use(ElementUI)

项目准备 项目模板简化-调整
删除模板中我们用不到的文件/代码

项目  git 版本控制
git init -> 
git status
git add .
git commit -m "注释"
在代码托管平台新建远程仓库
git remote add origin https://github.com/2237422522/mallmange.git
git push -u origin master (这是第一次推送时的命令)
之后的推送：git push

项目登陆 新建分支 login 组件 路由配置
查看分支状态：git branch
新建一个分支 专门写登陆功能
git checkout -b 分支名
git checkout -b dev-login
注意：
1：commit煤完成一个小功能就commit一次
2：push操作master去完成
新建组件+配置路由

项目登陆引入表单组件
el-from
1:引入
2：调整标签（h2+el-button）
3:label-position="top"

登陆axios插件
axios不是vue插件 希望能通过Vue.use(axios)去使用它
写法如：src/plugins/https.js
然后再main.js中导入在使用
import MyServerHttp from '@/plugins/http.js'
Vue.use(MyServerHttp)
结果：this.$https.get()就可以使用了

登陆成功-》来到home组件
1：js编程式导航：this.$router.push({name:'home'})
2：App.vue router-view
3:新建home组件
4：路由index.js中配置路由

简化登陆请求async 和await
让一步代码ajax看起来像同步代码  

项目登陆保存token
目的：如果用户没有登陆-》url直接来到home组件
在登陆成功时，保存正确用户的token
js:
    localStrorage.setItem('token','home')

首页home页布局容器 使用样式调整
引入布局容器

项目首页头部样式调整
layout布局
行el-row
列el-col
注意是24栏

首页侧边栏导航组件文档
el-menu
1:router 开启路由模式 true index值==path值
2：unique-opened是否保持一个子菜单的展开

首页侧边栏引入导航组件-调整
调整el-menu
index值不能一样

进入首页的权限验证：
beforeCreate(){
            // 获取token
            const token = localStorage.getItem('token')
        // if token有继续渲染组件
        // 没有-返回登陆组件
            if(!token){
                this.$route.push({name:'login'})
            }
        }