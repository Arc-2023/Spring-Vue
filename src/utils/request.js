import axios from "axios";
import {UserStore} from "@/store/user";

import {ElMessage, ElMessageBox} from "element-plus";
import router from "@/router";
const service = axios.create({
    baseURL:"127.0.0.1:8888",
    timeout:5000
})

service.interceptors.request.use(
    config=>{
        const userStore = UserStore()
        if(userStore.getoken){
            config.headers['token'] = userStore.getoken
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
service.interceptors.response.use(
    config=>{
        const data = config.data
        if(data.status==508){
            ElMessageBox.confirm(
                'Token expired,Trying Relogin?',
                'Message',
                {
                    confirmButtonText:'Relogin',
                    cancelButtonText:'Cancel'
                }
            ).then(()=>{
                router.push('/login').then(()=>{
                    ElMessage({
                        message:'redirecting',
                        type:'info'
                    })
                })
            })
        }else if(data.status==500 || config.status==500){
            return Promise.reject("Server Error")
        }
        else if(data.status == 404 || config.status==404){
            return Promise.reject("NOT FOUND")
        }
        else if(data.status == 400 || config.status==400){
            router.push('/login').then(()=>{
                return Promise.reject("NOT FOUND")
            })

        }
        else if(data.status!=200 || config.status!=200){
            return Promise.reject("Faild for other reason")
        }
        return config
    },
    error => {
        ElMessage({
            message:error,
            type:'error'
        })
        return error
    }
)
export default service
