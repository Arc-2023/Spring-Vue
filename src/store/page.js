import {acceptHMRUpdate, defineStore} from "pinia/dist/pinia";
import {addItem, changeItem, delitem, getItems, pauseitem, startItem, submitPushForm} from "@/api/itemanege";
import {ElMessage} from "element-plus";

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
            if (dataresult.code == 200) {
                ElMessage({
                    message:'Change Success',
                    type:'success'
                })
                return Promise.resolve('ok')
            } else {
                ElMessage({
                    message:'Change Falid : ' + error,
                    type:'error'
                })
                return Promise.reject(dataresult.message)
            }
        },
        async submitItem(termini) {
           const result = await addItem(termini)
            const data = result.data
            if(data.code==200){
                ElMessage({
                    message:'Success added',
                    type:'success'
                })
                return true
            }
            else {
                return Promise.reject()
            }
        },
        async submitPushForm(data){
            const result = await submitPushForm(data)
            if(result.data.code==200){
                return Promise.resolve()
            }else {
                return Promise.reject()
            }
        },
        async getItemss(username){
            console.log(username)
            const result = await getItems({username:username})
            console.log(result)
            if(result.data.code==200){
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
        }
    }
})
