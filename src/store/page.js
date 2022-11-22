import {acceptHMRUpdate, defineStore} from "pinia/dist/pinia";
import {
    addItem,
    changeItem,
    delitem,
    getItems, initStart,
    pauseitem,
    refreshThings,
    startItem,
    submitPushForm
} from "@/api/itemanege";
import {ElMessage} from "element-plus";
import {UserStore} from "@/store/user";

export const pagestore = defineStore('page',{

    state:()=>{
        return{
            submit:false,
            AppId:''

        }
    },
    actions:{
        async changeItem(data) {
            const result = await changeItem(data)
            const dataresult = result.data
            if (dataresult.status == 200) {
                ElMessage({
                    message:'Change Success',
                    type:'success'
                })
                return Promise.resolve('ok')
            } else {
                ElMessage({
                    message:'Change Falid : ' + dataresult.message,
                    type:'error'
                })
                return Promise.reject()
            }
        },
        async addItem(data) {
           return  await addItem(data).then(res=> {
                       if (res.status == 200) {
                           ElMessage({
                               message: 'Success added',
                               type: 'success'
                           })
                           return true
                       } else {
                           return Promise.reject()
                       }
                   }).catch(e=>{
                   ElMessage({
                       message:'Change Falid : ' + e,
                       type:'error'
                   })
                   return Promise.reject()
               })
        },
        async submitPushForm(data){
            const result = await submitPushForm(data)
            if(result.data.status==200){
                return Promise.resolve()
            }else {
                return Promise.reject()
            }
        },
        async refresh(username){
            const result = await refreshThings()
            if(result.data.status==200){
                ElMessage({
                    message:'Successfully geted',
                    type:'success'
                })
                return result.data.data
            }
            else {
                ElMessage({
                    message:'Faild geted',
                    type:'error'
                })
                return Promise.reject(result.data.msg)
            }

        },
        async delitem(id){
            return await delitem({id:id}).then(()=>{
                return Promise.resolve()
                }
            ).catch(e=>{
                ElMessage({
                    message:e,
                    type:'error'
                })
                return Promise.reject()
            })
        },
        async startitem(id){
            return await startItem({id:id}).then(()=>{
                ElMessage({
                    message:'Successfully started',
                    type:'success'
                })
                return Promise.resolve()
            }).catch(e=>{
                ElMessage({
                    message:'Faild to start: '+e,
                    type:'error'
                })
                return Promise.reject()
            })
        },
        async pauseitem(id){
            return await pauseitem({id:id}).then(()=>{
                ElMessage({
                    message:'Paused',
                    type:'success'
                })
                return Promise.resolve()
            }).catch(e=>{
                ElMessage({
                    message:'Faild to pause: '+ e,
                    type:'error'
                })
                return Promise.reject()
            })
        },
        async initStart(){
            return await initStart().then(res=>{
                if(res.data.status==200){
                    ElMessage({
                        message:'Init Quartz',
                        type:'success'
                    })
                    return Promise.resolve()
                }

            }).catch(e=>{
                ElMessage({
                    message:'Faild to refresh: '+ e,
                    type:'error'
                })
                return Promise.reject()
            })
        }
    }
})
