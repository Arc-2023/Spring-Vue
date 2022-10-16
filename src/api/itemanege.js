import request from "@/utils/request";

export  function getCurpage(data){
    return request({
        url:'http://192.168.2.247:8888/getpage',
        method:'get',
        params:data
    })
}
export function changeItem(data){
    return request({
        url:'http://192.168.2.247:8888/changeitem',
        method:'post',
        data
    })
}
export function addItem(data){
    return request({
        url:'http://192.168.2.247:8888/additem',
        method:'post',
        data
    })
}
export function submitPushForm(data){
    return request({
        url:'http://192.168.2.247:8888/submitPushForm',
        method:'get',
        params:data
    })
}
export function getItems(data){
    return request({
        url:'http://192.168.2.247:8888/getUserThings',
        method:'get',
        params:data
    })
}
export function delitem(data){
    return request({
        url:'http://192.168.2.247:8888/delitem',
        method:'get',
        params:data
    })
}
export function startItem(data){
    return request({
        url:'http://192.168.2.247:8888/startitem',
        method:'get',
        params:data
    })
}
export function pauseitem(data){
    return request({
        url:'http://192.168.2.247:8888/pauseitem',
        method:'get',
        params:data
    })
}

