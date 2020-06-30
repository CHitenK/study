import request from './../utils/request'
// 保存数据
export function save(data){
    return request({
        url: '/makeimg/save',
        method: 'post',
        data: data
    })
}
// 获取列表数据
export function getList(data){
    return request({
        url: '/makeimg/list',
        method: 'post',
        data: data
    })
}