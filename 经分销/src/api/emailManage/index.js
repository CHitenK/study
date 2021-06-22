import request from '@u/http'
import qs from 'qs'

// 邮件提醒列表信息-获取分页数据
export async function listReminderEmail(data) {
  return request({
    url: '/webapi/system/reminderEmailConfig/listReminderEmail.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 邮件提醒列表信息-删除
export async function delReminderEamil(data) {
  return request({
    url: '/webapi/system/reminderEmailConfig/delReminderEamil.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 邮件提醒列表信息-操作节点
export async function getReminderByInfo(data) {
  return request({
    url: '/webapi/system/reminderEmailConfig/getReminderByInfo.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 邮件提醒列表信息-问邮件提醒新增/编辑
export async function getAddEditInfo(data) {
  return request({
    url: '/webapi/system/reminderEmailConfig/getAddEditInfo.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 邮件提醒列表信息-获取启用的状态角色接口
export async function getRoleList(data) {
  return request({
    url: '/webapi/system/receiveEmailConfig/getRoleList.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 邮件提醒列表信息-获取启用状态用户
export async function getUserList(data) {
  return request({
    url: '/webapi/system/receiveEmailConfig/getUserList.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 邮件提醒列表信息-新增
export async function saveReminderEmail(data) {
  return request({
    url: '/webapi/system/reminderEmailConfig/saveReminderEmail.asyn',
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    data: {token: sessionStorage.getItem('token'), ...data}
  })
}

// 邮件提醒列表信息-修改
export async function modifyReminderEmail(data) {
  return request({
    url: '/webapi/system/reminderEmailConfig/modifyReminderEmail.asyn',
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    data: {token: sessionStorage.getItem('token'), ...data}
  })
}

// 邮件发送配置信息-分页
export async function listEmail(data) {
  return request({
    url: '/webapi/system/email/listEmail.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 邮件发送配置信息-获取分页下拉信息
export async function initList(data) {
  return request({
    url: '/webapi/system/email/toPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 邮件发送配置信息-删除
export async function delEmail(data) {
  return request({
    url: '/webapi/system/email/delEmail.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 邮件发送配置信息-禁用/启用
export async function auditEmail(data) {
  return request({
    url: '/webapi/system/email/auditEmail.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 邮件发送配置信息-详情
export async function emailDetail(data) {
  return request({
    url: '/webapi/system/email/toDetailsPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 邮件发送配置信息-编辑初始列表数据
export async function toEditPage(data) {
  return request({
    url: '/webapi/system/email/toEditPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 邮件发送配置信息-校验此商家和供应商是否存在
export async function getSelectBeanBySupplier(data) {
  return request({
    url: '/webapi/system/email/getSelectBeanBySupplier.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 邮件发送配置信息-新增
export async function saveEmail(data) {
  return request({
    url: '/webapi/system/email/saveEmail.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 邮件发送配置信息-修改
export async function modifyEmail(data) {
  return request({
    url: '/webapi/system/email/modifyEmail.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 应收邮件表- 分页
export async function listReceiveEmailConfig(data) {
  return request({
    url: '/webapi/system/receiveEmailConfig/listReceiveEmailConfig.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 应收邮件表-获取列表下拉
export async function receiveEmailConfigInit(data) {
  return request({
    url: '/webapi/system/receiveEmailConfig/toPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 应收邮件表-删除
export async function deleteReceiveEmailConfig(data) {
  return request({
    url: '/webapi/system/receiveEmailConfig/deleteReceiveEmailConfig.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 应收邮件表-根据公司获取事业部
export async function merchantBuReltSelectBean(data) {
  return request({
    url: '/webapi/system/merchantBuRel/getSelectBean.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}
