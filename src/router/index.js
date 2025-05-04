import { createRouter, createWebHistory } from 'vue-router'
//用户相关组件
import home from '../views/user/home.vue'
import find from '../views/user/find.vue'
import my from '../views/user/my.vue'
import post from '../views/user/post.vue'
//管理员相关组件
import admin from '../views/admin/admin.vue'
import approve from '../views/admin/approve.vue'
import reject from '../views/admin/reject.vue'
import pending from '../views/admin/pending.vue'
//登录界面
import login from '../views/login/login.vue'
import register from '../views/login/register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },    
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    //动态路由+嵌套路由
    {
      path: '/users/:id',
      component: login,
      children: [
        { path: '', redirect: 'home' },
        { path: '/home', component: home, },
        { path: '/find', component: find, },
        { path: '/my', component: my, },
        { path: '/post', component: post, },
      ]
    },
    //静态路由+嵌套路由
    {
      path: '/admin',
      component: admin,
      children: [
        { path: '', redirect: 'pending' },
        { path: '/pending', component: pending },
        { path: '/approve', component: approve },
        { path: '/reject', component: reject }
      ]
    }
  ],
})

export default router
