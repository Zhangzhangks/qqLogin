
import { createRouter, createWebHashHistory } from 'vue-router'
const login = () => import('../qqlogin.vue')
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: login },
        { path: '/login/callback', component: () => import('../callback.vue') },
        { path: '/weixin', component: () => import('../weixin.vue') }
    ]
})
export default router