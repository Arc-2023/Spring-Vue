import request from "@/utils/request";
export function login(data){
    return request({
        url:'http://192.168.2.247:8888/login',
        method:'get',
        params:data
    })
}
export function register(data){
    return request({
        url:'http://192.168.2.247:8888/register',
        method:'get',
        params:data
    })
}
