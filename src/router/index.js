import {createRouter, createWebHistory} from "vue-router/dist/vue-router";
import home from "@/views/Home"
import login from "@/views/Login";
import onlineNotes from "@/views/OnlineNotes/Home";
import thingManagement from "@/views/ThingManagement";
import thingPush from "@/views/ThingPush";
import onlineNotePage from "@/views/OnlineNotes/Page/OnlineNotePage";
const routes=[
    {
    path:'/login',
    name:'login',
    component: login
    },
    {
        path: '/',
        name:'Home',
        component:home,
        meta:{
            requiresAuth : true
        },
        children:[
            {
                path:'/thingmanage',
                name:'thingmanage',
                component:thingManagement
            },
            {
                path:'/onlinenotes',
                name:'onlinenotes',
                component:onlineNotes
            },
            {
                path: '/thingpush',
                name:'thingpush',
                component: thingPush
            },
            {
                path:'/nolinenotes',
                name:onlineNotes,
                component: onlineNotes
            },
            {
                path:'/onlinenotes/:id',
                name:onlineNotePage,
                component: onlineNotePage
            },
            {
                path:'/alist',
                beforeEnter(){
                    location.href='http://108.61.81.20:5244/'
                }
            }
        ]
    },



]

const router = createRouter({
    history:createWebHistory(),
    mode:'hash',
    scrollBehavior:0,
    routes
})
export default router
