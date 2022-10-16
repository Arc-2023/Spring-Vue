import router from "@/router";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {UserStore} from "@/store/user";
import {ElMessage} from "element-plus";

NProgress.configure({
    easing: 'ease', // 动画方式
    speed: 1000, // 递增进度条的速度
    showSpinner: false, // 是否显示加载ico
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3, // 更改启动时使用的最小百分比
    parent: 'body', //指定进度条的父容器
})
router.beforeEach(async (to,from,next)=>{
    const userStore = UserStore()
    NProgress.start();
    if (to.matched.some(record => record.meta.requiresAuth)) { // 判断该路由是否需要登录权限
        const token = userStore.getoken
        const expiredtime = userStore.getexpiretime
        if(Date.now()>expiredtime){
            ElMessage({
                message:'Token expired,Redirecting to login',
                type:'error'
            })
            next('/login')

        }
        if (token=='') {
            if (to.path == '/login') {
                next()
            } else {
                next({path:'/login'})
            }
        } else {
            next()
        }
    } else {
        next()
    }
})
router.afterEach(()=>{
    NProgress.done()
})
