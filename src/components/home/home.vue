<template>
    <el-container class="container">
        <el-header class="header">
            <el-row>
                <el-col :span="8">
                    <div class="grid-content bg-purple">左</div>
                </el-col>
                <el-col class="biaot" :span="8">
                    后台管理系统
                </el-col>
                <el-col :span="8">
                    <a class="loginout" @click="handleSignout()">退出</a>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside class="aside">
                <el-col >
                    <!-- 开启路由模式 -->
                    <el-menu :unique-opened="true" :router="true">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>用户管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="users">
                                    <i class="el-icon-menu"></i>
                                    <span>用户列表</span>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>权限管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="2-1">
                                    <i class="el-icon-menu"></i>
                                    <span>角色列表</span>
                                </el-menu-item>
                                <el-menu-item index="2-2">
                                    <i class="el-icon-menu"></i>
                                    <span>权限列表</span>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>商品管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="3-1">
                                    <i class="el-icon-menu"></i>
                                    <span>商品列表</span>
                                </el-menu-item>
                                <el-menu-item index="3-2">
                                    <i class="el-icon-menu"></i>
                                    <span>分类参数</span>
                                </el-menu-item>
                                <el-menu-item index="3-3">
                                    <i class="el-icon-menu"></i>
                                    <span>商品参数</span>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="4">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>订单管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="4-1">
                                    <i class="el-icon-menu"></i>
                                    <span>订单列表</span>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="5">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>数据统计</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="5-1">
                                    <i class="el-icon-menu"></i>
                                    <span>数据报表</span>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </el-col>
            </el-aside>
            <el-main class="main">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        beforeCreate(){
            // 获取token
            const token = localStorage.getItem('token')
        // if token有继续渲染组件
        // 没有-返回登陆组件
            if(!token){
                this.$route.push({name:'login'})
            }
        },
        methods: {
            handleSignout(){
                // 1>清楚token
                localStorage.clear()
                // 2：提示
                this.$message.success('退出成功')
                // 3：来到登陆组件
                this.$router.push({name:'login'})
            }
        }
    }
    
</script>
<style>
    .container {
        height: 100%;
    }

    .header {
        background-color: #b3c0d1;
        line-height: 60px;
    }

    .el-row div:nth-child(3) {
        text-align: right;
    }

    .biaot {
        text-align: center;
    }

    .aside {
        width: 200px;
        background-color: #d3dce6;
    }

    .loginout {
        text-decoration: none;
    }

    .main {
        background-color: #e9eef3;
        height: 100%;
    }
</style>