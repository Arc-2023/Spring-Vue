import {defineStore} from "pinia/dist/pinia";
import {
    getToken,
    setToken,
    resetToken,
    getUsername,
    setUsername,
    getRole,
    setRole,
    setNextExpireTime, getNextExpireTime, getalertToken, setalertToken
} from "@/utils/cookies";
import {changeAlertToken, login, register} from "@/api/auth";
import {ElMessage} from "element-plus";
import router from "@/router";

export const UserStore = defineStore('user',{
    state:()=>({
            token:getToken(),
            avator:'',
            username:getUsername(),
            userdata:'',
            nextexpiretime:getNextExpireTime(),
            role:getRole(),
            alertToken:getalertToken()
    }),
    actions:{
            async login(loginInfo){
                return await login(loginInfo).then(res=>{
                    if(res.data.status==200){
                        setToken(res.headers.token)
                        setUsername(res.data.data.username)
                        setRole(res.data.data.role)
                        setNextExpireTime(res.data.data.nextexpiretime)
                        if(res.data.data.alertToken==null){
                            ElMessage({
                                message:'token is null, begin push after setting it',
                                type:'error'
                            })
                        }
                        else {setalertToken(res.data.data.alertToken)}
                        ElMessage({
                            message:res.data.data.message,
                            type:'success'
                        })
                        return 'ok'
                    }else {
                        ElMessage({
                            message:res.msg,
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
                    router.push("/")
                    return Promise.resolve()
                }).catch(e=>{
                    ElMessage({
                        message:e,
                        type:'error'
                    })
                    return Promise.reject('faild to reg')
                })
        },
        async changeAlertToken(token){
                return await changeAlertToken({alertToken:token,username:this.state.username}).then(res=>{
                    ElMessage({
                        message:'successfully changed token',
                        type:'success'
                    })
                    return Promise.resolve()
                }).catch(e=>{
                    ElMessage({
                        message:'change faild: '+e,
                        type:'success'
                    })
                    return Promise.reject()
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
        },
        getalertToken(state){
            return state.alertToken
        }
    }
})
