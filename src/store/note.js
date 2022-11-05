import {addnote, deletenote, getAllnotes, getNoteContent, submitcontent, uploadimage} from '@/api/note'
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
                if(res.data.status==200){
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
               if(res.data.status==200){
                   ElMessage({
                       message:'geted successfully',
                       type:'success'
                   })
                   return Promise.resolve(res)
               }else {
                   ElMessage({
                       message:'geted with wrong status: '+ res.data.message,
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
            const{id,title,intro,content} = data;
            await submitcontent({id:id,title:title,intro:intro,content:content}).then(res=>{
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
        },
        async addnote(data){
            const {title,intro,creater} = data
            return await addnote({id:null,title:title,intro:intro,creater:creater})
                .then(res=>{
                    if(res.status==200){
                        ElMessage({
                            message:'note create successfully',
                            type:'success'
                        })
                        return res.data.data.id
                    }
                    ElMessage({
                        message:'faild add:' + e,
                        type:'error'
                    })
                    return  Promise.reject
                })
                .catch(e=>{
                    ElMessage({
                        message:'faild add:' + e,
                        type:'error'
                    })
                    return Promise.reject()
                })
        }
    }

})
