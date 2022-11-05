import {defineStore} from "pinia/dist/pinia";
import {
    getToken,
    setToken,
    resetToken,
    getUsername,
    setUsername,
    getRole,
    setRole,
    setNextExpireTime, getNextExpireTime
} from "@/utils/cookies";
import {login, register} from "@/api/auth";
import {ElMessage} from "element-plus";

export const UserStore = defineStore('user',{
    state:()=>({
            token:getToken(),
            avator:'',
            username:getUsername(),
            userdata:'',
            nextexpiretime:getNextExpireTime(),
            role:getRole(),
    }),
    actions:{
            async login(loginInfo){
                return await login(loginInfo).then(result=>{
                    console.log(result)
                    if(result.data.status==200){
                        this.token = result.headers.token
                        this.username = result.data.data.username
                        console.log(this.username)
                        this.avatar = result.data.data.avatar
                        this.role = result.data.data.role
                        this.nextexpiretime = result.data.data.nextexpiretime
                        setToken(this.token)
                        setUsername(this.username)
                        setRole(this.role)
                        setNextExpireTime(this.nextexpiretime)
                        ElMessage({
                            message:result.data.data.message,
                            type:'success'
                        })
                        return 'ok'
                    }else {
                        ElMessage({
                            message:result.msg,
                            type:'error'
                        })
                        return Promise.reject('faild')
                    }
                }).catch(error=>{
                    ElMessage({
                        message:error,
                        type:'error'
                    })
                    return Promise.reject()

                })
            },
            logout(){
                this.token=''
                resetToken()
                router.push('/login')
            },
        async register(data){
                return await register(data).then(()=>{
                    ElMessage({
                        message:'register success',
                        type:'success'
                    })
                    return Promise.resolve()
                }).catch(e=>{
                    ElMessage({
                        message:e,
                        type:'error'
                    })
                    return Promise.reject('faild to reg')
                })
        }
        },
    getters:{
        getoken(state){
            return state.token == ' ' ? getToken() : state.token;
        },
        getAvatar(state){
            return state.avatar
        },
        getUsername(state){
            return state.username
        },
        getUserdata(state){
            return state.userdata
        },
        getRole(state){
            return state.role
        },
        getexpiretime(state){
            return state.nextexpiretime
        }
    }
})
