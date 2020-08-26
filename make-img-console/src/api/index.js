import request from './../utils/request'
// 保存数据
export function save(data){
    return request({
        url: '/api/makeimg/save',
        method: 'post',
        data: data
    })
}
// 获取列表数据
export function getList(data){
    return request({
        url: '/api/makeimg/list',
        method: 'post',
        data: data
    })
}
/**
 * @description 删除数据
 * @param {String} id  /makeing/delete
 */
export function deleData(data){
    return request({
        url: '/api/makeimg/delete',
        method: 'post',
        data: data
    })
}
/**
 * @description 修改数据
 * @param {String} id  /makeing/delete
 */
export function updateData(data){
    return request({
        url: '/api/makeimg/update',
        method: 'post',
        data: data
    })
}
/**
 * @description 获取图片的配置数据
 * @param {String} id
 */
export function getImgDetail(data) {
    return request({
        url: '/api/makeimg/detail',
        method: 'get',
        params: data
    })
}