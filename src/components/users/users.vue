<template>
    <el-card class="box-card">
        <!-- 1：面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 2：搜索 -->
        <template>
            <el-col class="searchRow">
                <el-input @clear="loadUserList()" clearable placeholder="请输入内容" v-model="query" class="inputSearch">
                    <el-button @click="searchUser()" slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <el-button type="success" @click="dialogFormVisibleAdd = true" style="margin-left:5px;position: relative;
    top: -.5px;">添加按钮</el-button>
            </el-col>
        </template>
        <!-- 3：表格 -->
        <el-table :data="userlist" style="width: 100%">
            <el-table-column type="index" label="#" width="60">
            </el-table-column>
            <el-table-column prop="username" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="180">
            </el-table-column>
            <el-table-column prop="mobile" label="电话" width="120">
            </el-table-column>
            <el-table-column label="日期" width="120">
                <template v-slot="userlist">{{userlist.row.create_time | fmdate}}</template>v-
            </el-table-column>
            <!-- 这里有个问题，视图优先于数据修改了 -->
            <el-table-column label="用户状态" width="120">
                <template v-slot="userlist">
                    <el-switch :value="userlist.row.mg_state" @change="changeState(userlist.row)" active-color="#13ce66" inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template v-slot="scope">
                    <el-button plain size="mini" 
                    @click="showEditUser(scope.row)"
                    type="primary" icon="el-icon-edit" circle></el-button>
                    <el-button plain 
                        @click="showRole(scope.row)"
                     size="mini" type="success"
                        icon="el-icon-check" circle></el-button>
                    <el-button 
                        @click="showDeleUserMsgBox(scope.row.id)"
                    plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 4：分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum"
            :page-sizes="[2,4, 8, 12]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>

        <!-- 对话框添加用户 -->
        <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
            <el-form :model="form">
                <el-form-item :rules="{required: true, message: '用户名不能为空', trigger: 'blur'}" label="用户名"
                    label-width="100px">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item :rules="{required: true, message: '密码不能为空', trigger: 'blur'}" label="密码"
                    label-width="100px">
                    <el-input v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" label-width="100px">
                    <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" label-width="100px">
                    <el-input v-model="form.mobile" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
                <el-button type="primary" @click="addUserList()">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 编辑用户 -->
        <el-dialog title="添加用户" :visible.sync="dialogFormVisibleEdit">
            <el-form :model="form">
                <el-form-item  label="用户名"
                    label-width="100px">
                    <el-input disabled v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" label-width="100px">
                    <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" label-width="100px">
                    <el-input v-model="form.mobile" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
                <el-button type="primary" @click="editUser()">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 修改角色 -->
        <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRol">
        <el-form :model="form">
            <el-form-item label="活动名称" label-width="100px">
                {{ curName }}{{curId}}
            </el-form-item>
            <el-form-item label="角色" label-width="100px">
                <!-- 如果select的绑定的数据的值 和option的value一样
                    就会显示当前的option的label的值
                 -->
            <el-select v-model="curId" placeholder="请选择角色">
                <el-option label="请选择" :value="-1" disabled></el-option>
                <el-option
                    v-for="(item,index) in roles"
                 :label="item.roleName" :value="item.id" :key="index"></el-option>
            </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleRol = false">取 消</el-button>
            <el-button type="primary" @click="setRole()">确 定</el-button>
        </div>
        </el-dialog>
    </el-card>

</template>

<script>
    export default {
        data() {
            return {
                query: '',
                // 添加对话框的属性
                dialogFormVisibleAdd: false,
                // 编辑用户对话框
                dialogFormVisibleEdit:false,
                // 修改角色对话框
                dialogFormVisibleRol:false,
                // 当前角色ID
                curId:-1,
                // 分页相关数据
                curName:'',
                curuserId:'',
                total: -1,
                pagenum: 1,
                pagesize: 2,
                userlist: [{
                    username: '',
                    email: '',
                    mobile: '',
                    create_time: '',
                    mg_state: ''
                }],
                // 添加用户框
                form: {
                    username: '',
                    password: '',
                    email: '',
                    mobile: '',
                },
                roles:[]
            }

        },
        methods: {
            async getUsersList() {
                // 获取用户列表的请求
                // query 查询参数可以为空
                // pagenum当前页码 不能为空
                // pagesize每页显示条数 不能为空
                // 需要授权的 API ，必须在请求头中使用 Authorization 字段提供 token 令牌
                // 设置请求头 
                const AUTH_TOKEN = localStorage.getItem('token')
                this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
                const res = await this.$http.get(
                    `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
                const {
                    meta: {
                        status,
                        msg
                    },
                    data: {
                        users,
                        total
                    }
                } = res.data
                // console.log(res.data)
                if (status === 200) {
                    // 1:给表格数据赋值
                    this.userlist = users
                    // 2：给total赋值
                    this.total = total
                    // 提示
                    // this.$message.success(msg)
                    // this.pagenum = 1
                } else {
                    this.$message.warning(msg)
                }
            },
            // 分页相关的方法
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pagesize = val
                this.pagenum = 1
                this.getUsersList()

            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pagenum = val
                this.getUsersList()
            },
            // 搜索用户
            searchUser() {
                // 按照input绑定的query去搜索值
                this.getUsersList()
            },
            loadUserList() {
                this.getUsersList()
            },
            // 添加用户  发送请求
            async addUserList() {
                // 关闭对话框
                this.dialogFormVisibleAdd = false
                const res = await this.$http.post(`users`, this.form)
                const {
                    meta: {
                        status,
                        msg
                    },
                    data
                } = res.data
                if (status === 201) {
                    // 提示成功
                    this.$message.success(msg)
                    // 更新视图
                    this.getUsersList()
                    // 重置form
                    // this.form.username=""
                    // this.form={}
                    // for循环遍历
                    this.form = {}
                } else {
                    this.$message.warning(msg)
                }

            },
            // 删除用户 ->打开消息盒子(config)
            showDeleUserMsgBox(id) {
                this.$confirm('此操作将永久删除用户?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(
                  async  () => {
                    //   发送删除的请求：id---->用户id
                    // 1：data中找userID 2：把userID传进来
                    const res =await this.$http.delete(`users/${id}`)
                    const {meta:{msg,status}} = res.data
                    if(status === 200){
                        this.pagenum =1
                        this.getUsersList()
                        this.$message({
                        type: 'success',
                        message:msg
                        });
                    }else{
                        this.$message({
                        type: 'warning',
                        message:msg
                        }); 
                    }
                    
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
                });
            },
            // 编辑用户
            showEditUser(user){
                this.dialogFormVisibleEdit=true
                this.form=user
                // console.log(this.form)
            },
            // 修改用户数据
            async editUser(){
                const res = await this.$http.put(`users/${this.form.id}`,this.form)
                const {meta:{msg,status}} = res.data
                // 关闭对话框
                if(status === 200){
                    this.dialogFormVisibleEdit = false
                    // 更新视图
                    this.getUsersList()
                    this.form={}
                }else{
                    this.$message.warning("更新失败")
                }
                
            },
            // 更改状态
            async changeState(user){
                let state = !user.mg_state
                const res = await this.$http.put(`users/${user.id}/state/${state}`)
                const {meta:{msg,status}} = res.data
                if(status === 200){
                    user.mg_state = !user.mg_state
                }else{
                    this.$message.warning("修改状态失败")
                }
            },
            async showRole(user){
                this.curuserId = user.id
                this.dialogFormVisibleRol= true
                const res1 = await this.$http.get(`users/${user.id}`)
                this.curId = res1.data.data.rid
                const res = await this.$http.get(`roles`)
                this.curName = user.username
                const {data,meta:{msg,status}} = res.data
                this.roles = data
            },
            async setRole(){
                const res = this.$http.put(`users/${this.curuserId}/role`,{
                    rid:this.curId
                })
                // users/:id/role
                // :id 要修改的用户的id 请求体重rid修改新值角色id
                //关闭对话框
                this.dialogFormVisibleRol= false
            }
        },
        created() {
            this.getUsersList()
        },
    }
</script>
<style>
    .box-card {
        height: 100%;
    }

    .box-card .inputSearch {
        width: 300px;
    }

    .searchRow {
        margin-top: 20px;
    }
</style>