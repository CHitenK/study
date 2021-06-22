import request from '@u/http'
import qs from 'qs'

// 账期提醒配置-获取分页数据
export async function getListByPage(data) {
  return request({
    url: '/webapi/order/accountingReminderConfig/getListByPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 账期提醒配置-删除
export async function delAccountingReminderConfig(data) {
  return request({
    url: '/webapi/order/accountingReminderConfig/delAccountingReminderConfig.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 新增或编辑平台品类配置
export async function saveOrUpdateAccountingReminderConfig(data) {
  return request({
    url: '/webapi/order/accountingReminderConfig/saveOrUpdateAccountingReminderConfig.asyn',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 账期提醒配置-审核平台品类配置
export async function auditAccountingReminderConfig(data) {
  return request({
    url: '/webapi/order/accountingReminderConfig/auditAccountingReminderConfig.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 账期提醒配置-根据ID获取配置
export async function getAccountingReminderConfig(data) {
  return request({
    url: '/webapi/order/accountingReminderConfig/getAccountingReminderConfig.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}
