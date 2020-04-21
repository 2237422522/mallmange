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

首页头部的退出功能
handleSignout(){
                // 1>清楚token
                localStorage.clear()
                // 2：提示
                this.$message.success('退出成功')
                // 3：来到登陆组件
                this.$router.push({name:'login'})
            }

1：切换到master
2：git merge dev-login 合并分支
3：push
4: 新建dev-users

用户管理-》用户列表 新建组件 路由配置
1：home.vue开启路由模式 index值-》path值
2：home.vue main -> router-view
3: 新建users.vue
4: 在路由配置中在homechildren配置users的路由

用户管理-用户列表 面包屑和搜索框
1：el-card 卡片
2：面包屑
3：el-row>el-col>el-input+el-button
4:调整样式

用户管理-用户列表 引入表格组件
el-table(data数据源[])>el-table-column(label表头/prop='数据')>字符串数据

用户管理-用户列表 表头处理
按照效果调整表头数量和label
type="index"该列的 每个单元格就会有序号

用户管理-用户列表 请求数据-设置请求头
1.created(){this.getUserList()}
2:methods:{getUserList(){发送请求}}
3：接口文档中除了登陆之外的所有请求都需要进行授权->设置请求头
4：找到axios中关于
const AUTH_TOKEN = localStorage.getItem('token')
this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)

用户管理-用户列表 渲染数据-一般数据
1：结构赋值给this.userlist = res.data.data.users
2:props=""
    username:'',
    email:'',
    mobile:'',
    create_time:'',
    mg_state: ''

最终写法：
slot-scope 作用：传值
slot-scope 的值会自动去上一级找最外层标签el-table所绑定的数据userlist
slot-scope="scope"此时"scope"==userlist数组
scope.row是数组的每个对象
scope.row.create_time我们要用的数据

用户管理-用户列表 分页组件
该接口支持分页 url参数中pagenum pagesize说明该接口是支持分页功能的
1：@size-change 每页显示条数变化时触发
2：@current-change当前页改变时触发
3：current-page设置当前页是第几页
4：page-sizes=[2,3,4,5]
5:page-szie 设置显示条数
6：total数据总数

用户管理-用户列表 分页组件配置数据
1：current-page="pagenum"
2:page-size=2
3::total="total"

用户管理-用户列表 分页组件 分页请求
1：每页显示条数改变 ->this.pagesize = val ->this.getUserList()
2:页码改变时-》this.pagenum = val -> this.getUserList()
>希望当每条数改变时从第一页开始显示 this.pagenum =1 -> currpage =1?

用户管理-用户列表 搜索用户
点击搜索按钮 发送请求
一键清除 clearable

用户管理-用户列表 添加用户 显示对话框
1：引入对话框》el-form
2:点击添加用户的按钮->显示对话框
3：配置对话框
3.1 :model=form {看接口文档中添加用户时用那个数据}

用户管理-用户列表 添加用户 发送请求
1：post this.form
2: 关闭对话框
3：清空文本框
4：更新视图
5：提示框
6:status ===201

用户管理-用户列表 删除用户 
this.$config().then().catch()
1:点击确定 ->  .then的参数
2：点击取消 -> .catch的参数

用户管理-用户列表 删除用户  处理响应
1：点击确定 ->发送delete请求
1.1 提示
1.2 更新数据

用户管理-用户列表 编辑用户  显示对话框
点击操作中的编辑按钮 打开编辑对话框
1：找到编辑按钮@click
2：打开对话框
3：把之前添加对话框进行复制 -修改

gitbash ->指令操作
gitGUI -> 图形页面 ->一个能操作git的软件
    >实际开发中bash频率多

项目 用户管理 用户列表 编辑用户 显示编辑数据
1：点击edit编辑按钮 scope.row 
2：在showEditUser中 this.form = user  user其实是scope.row
用户名 禁用

项目 用户管理 用户列表 编辑用户 发送请求
1：找到对话框的确定按钮 ->editUser() 发送请求
this.form = user
id -> this.form.id
先点击编辑，在点击添加->打开对话框之前 this.form={}

项目用户管理->用户列表 ->修改用户状态
<!-- 这里出现了一个问题，视图优先于数据修改了 
所以需要将v-modle绑定的数据 该为属性绑定:value=""
-->
1：找到开关@change="changeState(user)"
2:changeState(user){
    发送请求
}

用户管理-》用户列表-分配角色-》功能演示
1：点击按钮，打开对话框
2：在对话框里面有个下拉框
3：修改当前用户的角色
4：一共5个角色名，来源于请求
每个角色的权限是不同的

用户管理-》用户列表-》分配角色 显示对话框
1：点击操作中的按钮-》打开对话框
2：引入对话框下拉按钮
-》下拉框的特性：如果select绑定的数据的值和option的value值一样
此时显示的就是该option的lebal值
3:把option分成了两类 请选择(-1) v-for 遍历roles

用户管理-》用户列表-》分配角色 显示对话框 下拉框
el-select 和el-option
1:当改变label时，-》该label显示-》改变了value-》el-select v-model绑定的数据自动关联

用户管理-》用户列表-》分配角色 显示当前用户角色
1：通过请求获取所有橘色roles
2：v-for el-option  :label="item.rolename" :value="item.id"
3:通过请求获取当前用户的rid
4：给el-select中v-model绑定的数据赋值 this.curId = res.data.data.rid
>rid接口文档的参数名师role_id

用户管理-》用户列表-》分配角色 修改用户角色
1：通过视图操作-》修改label
2:curId
3:在setRole方法中使用用户id 在打他声明cuId= -1  //这里的描述可能错误了