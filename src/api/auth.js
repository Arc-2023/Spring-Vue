import request from "@/utils/request";
const backend = 'http://119.23.243.88:8888/'
export function login(data){
    return request({
        url: backend+'login',
        method:'get',
        params:data
    })
}
export function register(data){
    return request({
        url:'backend+register',
        method:'get',
        params:data
    })
}
