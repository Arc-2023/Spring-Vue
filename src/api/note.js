import request from "@/utils/request";
const backend = 'http://119.23.243.88:8888/'
export function getAllnotes(data){
    return request({
        url:backend+'getAllnotes',
        method:'get',
        params:data
    })
}
export function getNoteContent(data){
    return request({
        url:backend+'getnotecontent',
        method:'get',
        params:data
    })
}
export function deletenote(data){
    return request({
        url:backend+'delnote',
        method:'get',
        params:data
    })
}
export function uploadimage(data){
    return request({
        url:backend+'uploadimage',
        method:'post',
        headers:{'Content-Type':'multipart/mixed'},
        data:data.formdata,
        //params:{username:data.username}
    })
}
export function submitcontent(data){
    return request({
        url:backend+'submitcontent',
        method:'post',
        data:data
    })
}
export function addnote(data){
    return request({
        url:backend+'addnote',
        method:'post',
        data:data
    })
}
export function delimg(data){
    return request({
        url:backend+'delimg',
        method:'get',
        params:data
    })
}
