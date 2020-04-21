<template>
    <div class="login-wrap">
        <el-form class="login-form" :label-position="labelPosition" label-width="80px" :model="formData">
            <p>用户登录</p>
            <el-form-item label="账号名">
                <el-input v-model="formData.username"></el-input>
            </el-form-item>
            <el-form-item label="账号密码">
                <el-input v-model="formData.password" @keyup.enter.native="handLogin()"></el-input>
            </el-form-item>
            <el-button type="primary" class="login-btn" @click.prevent="handLogin()">登陆</el-button>
        </el-form>
    </div>

</template>

<script>
    export default {
        data() {
        return {
            labelPosition: 'top',
            formData: {
                username: '',
                password: ''
            }
        };
        },
        methods:{
            async handLogin(){
                // 希望让异步操作的代码看起来像同步代码
                // ES7 async+await
                const res = await this.$http.post('login',this.formData)
                // 登陆成功
                // 1：跳转到home 2：提示成功
                const {data,meta:{msg,status}} = res.data
                // 登陆不成功 
                // 保存token
                // 弹窗提示
                if(status === 200){
                    this.open2(msg,'success')
                    localStorage.setItem('token',data.token)
                    this.$router.push({name:'home'})
                }
                else{
                    this.open2(msg,'warning')
                }
            },
            open2(message,type) {
                this.$message({
                message,
                type
                });
            }
        }
    }
</script>
<style>
.login-wrap{
    background-color: #324152;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.login-wrap p{
    text-align: center;
}
.login-wrap .login-form{
    background-color: #fff;
    width: 400px;
    padding: 30px;
    border-radius: 5px;
}
.login-wrap .login-btn{
    width: 100%;
}
</style>