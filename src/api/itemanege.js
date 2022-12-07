import request from "@/utils/request";
const backend = 'http://119.23.243.88:8888/'
export  function getCurpage(data){
    return request({
        url: backend+'getpage',
        method:'get',
        params:data
    })
}
export function changeItem(data){
    return request({
        url:backend+'changeitem',
        method:'post',
        data
    })
}
export function addItem(data){
    return request({
        url:backend+'additem',
        method:'post',
        data
    })
}
export function submitPushForm(data){
    return request({
        url:backend+'submitPushForm',
        method:'get',
        params:data
    })
}
export function refreshThings(data){
    return request({
        url:backend+'refreshthings',
        method:'get',
        params:data
    })
}
export function delitem(data){
    return request({
        url:backend+'delitem',
        method:'get',
        params:data
    })
}
export function startItem(data){
    return request({
        url:backend+'startitem',
        method:'get',
        params:data
    })
}
export function pauseitem(data){
    return request({
        url:backend+'pauseitem',
        method:'get',
        params:data
    })
}
export function initStart(){
    return request({
        url:backend+'initstart',
        method:'get'
    })
}

