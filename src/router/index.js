import Vue from 'vue'
import VueRouter from 'vue-router'

// @ => 表示可以自动找到src文件夹
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'

Vue.use(VueRouter)

const routes = [{
        name: 'login',
        path: '/login',
        component: Login
    },
    {
        name: 'home',
        path: '/',
        component: Home,
        children: [{
            name: 'users',
            path: 'users',
            component: Users
        }]
    }
]
const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router