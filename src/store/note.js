import {deletenote, getAllnotes, getNoteContent, submitcontent, uploadimage} from '@/api/note'
import {defineStore} from "pinia/dist/pinia";
import {ElMessage} from "element-plus";

export const notestore = defineStore('notestore',{
    state(){
        return{

        }
    },
    actions:{
        getallnotes(username){
            return getAllnotes({username:username}).then((res)=>{
                if(res.data.code==200){
                    ElMessage({
                        message:'get notes successfully',
                        type:'success'
                    })
                    return Promise.resolve(res)
                }else {
                    return Promise.reject()
                }
            }).catch(e=>{
                ElMessage({
                    message:'get notes faild: ' + e ,
                    type:'error'
                })
                return Promise.reject()
            })
        },
        async getnote(id){
           return await getNoteContent({id:id}).then(res=>{
               if(res.data.code==200){
                   ElMessage({
                       message:'geted successfully',
                       type:'success'
                   })
                   return Promise.resolve(res)
               }else {
                   ElMessage({
                       message:'geted with wrong code: '+ res.data.message,
                       type:'error'
                   })
               }
           }).catch(e=>{
               ElMessage({
                   message:'getted faild:' + e,
                   type:'error'
               })
               return Promise.reject()
           })
        },
        async delitem(id){
            return await deletenote({id:id}).then((res)=>{
                ElMessage({
                    message:'del successfully',
                    type:'success'
                })
                return Promise.resolve()
            }).catch(e=>{
                ElMessage({
                    message:'del faild:' + e,
                    type:'error'
                })
                return Promise.reject()
            })
        },
        async upload(formdata){
            await uploadimage(formdata).then((res)=>{
                ElMessage({
                    message:'img upload successfully',
                    type:'success'
                })
                return res.data.url
            }).catch(e=>{
                ElMessage({
                    message:'img upload faild:' + e,
                    type:'error'
                })
                return Promise.reject()
            })
        },
        async submitcontent(data){
            const{id,noteid,content} = data;
            await submitcontent({id:id,noteid:noteid,content:content}).then(res=>{
                ElMessage({
                    message:'img upload successfully',
                    type:'success'
                })
                return Promise.resolve()
            }).catch(e=>{
                ElMessage({
                    message:'faild submit:' + e,
                    type:'error'
                })
                return Promise.reject()
            })
        }
    }

})
