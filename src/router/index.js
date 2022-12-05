import {createRouter, createWebHistory} from "vue-router/dist/vue-router";
import home from "@/views/Home"
import login from "@/views/Login";
import onlineNotes from "@/views/OnlineNotes/Home";
import thingManagement from "@/views/Thing/manage";
import thingPush from "@/views/Thing/setting";
import onlineNotePage from "@/views/OnlineNotes/Page/OnlineNotePage";
import myProfile from "@/views/MyProfile";
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
              path:'/myprofile',
              name: 'myprofile',
              component:myProfile
            },
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
                    location.href='http://119.23.243.88:5244/'
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
