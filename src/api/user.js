import request from '@/request'
export function getNowUser() {
    return request({
        url: '/user',
        method: 'get'
    })
}


export function updatePassword(oldPassword, newPassword) {
    const data={
        oldPassword,newPassword
    }
    return request({
        url: '/user/password',
        method: 'post',
        data
    })
}