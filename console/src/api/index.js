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
/**
 * @description 删除数据
 * @param {String} id  /makeing/delete
 */
export function deleData(data){
    console.log(data)
    return request({
        url: '/makeimg/delete',
        method: 'post',
        data: data
    })
}
/**
 * @description 修改数据
 * @param {String} id  /makeing/delete
 */
export function updateData(data){
    console.log(data)
    return request({
        url: '/makeimg/update',
        method: 'post',
        data: data
    })
}