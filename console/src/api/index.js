import request from './../utils/request'

export function save(data){
    return request({
        url: '/makeimg/save',
        method: 'post',
        data: data
    })
}