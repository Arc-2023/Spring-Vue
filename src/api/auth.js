import request from "@/utils/request";
export function login(data){
    return request({
        url:'http://119.23.243.88:8888/login',
        method:'get',
        params:data
    })
}
export function register(data){
    return request({
        url:'http://119.23.243.88:8888/register',
        method:'get',
        params:data
    })
}
