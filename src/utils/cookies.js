import Cookie from 'js-cookie'
export function getToken(){
    return Cookie.get('token')
}
export function setToken(token){
    return Cookie.set('token',token)
}
export function resetToken(){
    return Cookie.remove('token')
}
export function setUsername(username){
    return Cookie.set('username',username)
}
export function getUsername(){
    return Cookie.get('username')
}
export function setRole(role){
    return Cookie.set('role',role)
}
export function getRole(){
    return Cookie.get('role')
}
export function setNextExpireTime(time){
    return Cookie.set('nextexpiretime',time)
}
export function getNextExpireTime(){
    return Cookie.get('nextexpiretime')
}
export function getalertToken(){
    return Cookie.get('alertToken')
}
export function setalertToken(token){
    return Cookie.set('alertToken',token)
}

