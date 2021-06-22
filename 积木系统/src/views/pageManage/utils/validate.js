// 积木系统校验函数  针对element 表单校验 checkCoupon
import { checkCoupon } from '@/api/pageManage/index'
import store from '@/store'
import { Message } from 'element-ui'
/**
 * @description 校验时间不能超过当前时间)Date
 * @param {Date} value 时间值 YYYY-MM-dd HH:mm:ss
 */
export const validateNowTiems = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请选择时间'))
  }
  // 传入数组时，取第一个值
  let val = rule.type === 'array' ? value[0] : value
  const target = Date.now()
  if (typeof (val) === 'string') {
    val = value.indexOf('-') >= 0 ? val.replace(/-/gi, '/') : val
    val = new Date(val).getTime()
  }
  if (val <= target) {
    return callback(new Error('时间不能早于当前时间'))
  }
  callback()
}
export function isUrl(rule, value, callback) {
  if (!value) return callback(new Error('请输入内容'))
  var regExp = new RegExp('^http[s]?:\/\/([\\w\\-\\.]+)+[\w-]*([\\w\\-\\.\\/\\?%&=]+)?$', 'ig')
  if (regExp.test(value)) {
    callback()
    return true
  } else {
    return callback(new Error('请输入正确的链接路径'))
  }
}
/**
 * @description 校验优惠券Id
 */
export async function validateCoupon(rule, value, callback, type) {
  if (!value) {
    return callback(new Error('请输入优惠券ID'))
  }
  if (!('startTime' in store.getters[type].titleData)) {
    return callback(new Error('请先设置专题启用时间'))
  }
  const cmomitData = {
    idList: [value],
    startTime: store.getters[type].titleData.isForever ? null : store.getters[type].titleData.startTime,
    endTime: store.getters[type].titleData.isForever ? null : store.getters[type].titleData.endTime
  }
  const data = await checkCoupon(cmomitData)
  if (data.code !== 200) {
    return callback(new Error(data.msg || '输入ID无效'))
  } else {
    callback()
  }
}
/**
 * @description 标题数据校验
 * @param {Object} data 标题数据
 * @returns {Boolean}
 */
export function validateTitleData(data) {
  if (!data.title || data.title.length > 50) {
    Message({
      message: '标题:标题名称不能为空，且不能超过50个字符',
      type: 'error'
    })
    return false
  }
  // 未上线状态才校验
  if (!data.isForever) {
    if (!data.startTime || !data.endTime) {
      Message({
        message: '标题:请设置专题启用时间',
        type: 'error'
      })
      return false
    }
    if (data.status !== '1') { // 不是在线状态才校验时间
      if (data.startTime <= Date.now()) {
        Message({
          message: '标题:启用开始时间须大于当前时间',
          type: 'error'
        })
        return false
      }
    }
  }
  if (data.bgType === '0') { // coverColor
    if (!data.coverColor) {
      Message({
        message: '标题:请设置页面背景色',
        type: 'error'
      })
      return false
    }
  }
  if (data.bgType === '1') {
    if (!data.coverImageUrl) {
      Message({
        message: '标题:请上传页面背景图',
        type: 'error'
      })
      return false
    }
  }
  if (!data.targetPeople || data.targetPeople.length < 1) {
    Message({
      message: '标题: 请选中目标人群',
      type: 'error'
    })
    return false
  }
  if (data.speedy.handle && data.speedy.handle.includes(0)) {
    if (!data.shareBgImg) {
      Message({
        message: '标题: 请上传分享图片',
        type: 'error'
      })
      return false
    }
  }
  return true
}
/**
 * @description Banner组件数据校验
 * @param {Object} data Banner数据
 * @param {Number} index 下标
 * @returns {Boolean}
 */
export function validateBannerData(tData, index) {
  const data = tData.businessData || {}
  const commomTips = `${index + 1}.${tData.label}:` // 公共提示语
  // 模块跳转时间校验
  if (data.items && data.items.length > 1) {
    if (!data.jumpTime) {
      Message({
        message: `${commomTips} 请设置跳转时间`,
        type: 'error'
      })
      return false
    }
    if (data.jumpTime <= 0 && data.jumpTime > 30) {
      Message({
        message: `${commomTips} 跳转时间在0-30秒之间`,
        type: 'error'
      })
      return false
    }
  }
  let flage = true
  let item
  for (item of data.items) { // 校验图片数据
    // 校验图片
    if (!item.image) {
      Message({
        message: `${commomTips} 请上传图片`,
        type: 'error'
      })
      flage = false
      return false
    }
    switch (item.jumpType) {
      case 0: { // 商品ID
        if (!item.productCode) {
          Message({
            message: `${commomTips} 商品ID不能为空`,
            type: 'error'
          })
          flage = false
        }
        break
      }
      case 1: { // 专题ID
        if (!item.specialId) {
          Message({
            message: `${commomTips} 专题ID不能为空`,
            type: 'error'
          })
          flage = false
        }
        break
      }
      case 2: { // 活动编号
        if (!item.activityId) {
          Message({
            message: `${commomTips} 活动编号不能为空`,
            type: 'error'
          })
          flage = false
        }
        break
      }
      case 3: { // 链接
        if (!item.link) {
          Message({
            message: `${commomTips} 链接不能为空`,
            type: 'error'
          })
          flage = false
        }
        break
      }
      default: break
    }
  }
  if (!flage) return false
  return true
}
/**
 * @description 校验锚点组件数据
 * @param {Object} tData 锚点数据
 * @param {Number} index 下标
 * @returns {Boolean}
 */
export function validateAnchorData(tData, index) {
  const data = tData.businessData || {}
  const commomTips = `${index + 1}.${tData.label}:` // 公共提示语
  if (!data.bgColor) {
    Message({
      message: `${commomTips} 请设置背景颜色`,
      type: 'error'
    })
    return false
  }
  if (!data.bgColorActive) {
    Message({
      message: `${commomTips} 请设置选中背景色`,
      type: 'error'
    })
    return false
  }
  if (!data.textColor) {
    Message({
      message: `${commomTips} 请设置锚点文字颜色`,
      type: 'error'
    })
    return false
  }
  if (!data.textColorActive) {
    Message({
      message: `${commomTips} 请设置选中文字颜色`,
      type: 'error'
    })
    return false
  }
  if (data.labels && data.labels.length > 0) {
    let flage = true
    let item
    for (item of data.labels) {
      if (!item.name) {
        flage = false
        break
      }
    }
    if (!flage) {
      Message({
        message: `${commomTips} 模块名称不能为空`,
        type: 'error'
      })
      return false
    }
  }
  return true
}
/**
 * @description 校验搜索组件数据
 * @param {Object} tData 查询数据
 * @param {Number} index 下标
 * @returns {Boolean}
 */
export function validateSearchData(tData, index) {
  const data = tData.businessData || {}
  const commomTips = `${index + 1}.${tData.label}:` // 公共提示语
  if (!data.bgColor) {
    Message({
      message: `${commomTips} 请设置背景颜色`,
      type: 'error'
    })
    return false
  }
  return true
}
/**
 * @description 校验优惠券组件数据
 * @param {Object} tData 优惠券数据
 * @param {Number} index 下标
 * @returns {Boolean}
 */
export function validateCouponData(tData, index) {
  const data = tData.businessData || {}
  const commomTips = `${index + 1}.${tData.label}:` // 公共提示语
  if (!data.img) {
    Message({
      message: `${commomTips} 请上传图片`,
      type: 'error'
    })
    return false
  }
  if (!data.id) {
    Message({
      message: `${commomTips} 优惠券ID不能为空`,
      type: 'error'
    })
    return false
  }
  if (data.drawImgType === 1) {
    if (!data.drawImg) {
      Message({
        message: `${commomTips} 请上传图片`,
        type: 'error'
      })
      return false
    }
  }
  if (data.distributeType === 1) {
    if (!data.distributeImg) {
      Message({
        message: `${commomTips} 请上传图片`,
        type: 'error'
      })
      return false
    }
  }
  return true
}
/**
 * @description 校验将奖励佣金组件数据
 * @param {Object} tData 奖励金数据
 * @param {Number} index 下标
 * @returns {Boolean}
 */
export function validateSalesData(tData, index) {
  const data = tData.businessData || {}
  const commomTips = `${index + 1}.${tData.label}:` // 公共提示语
  if (!data.bgImg) {
    Message({
      message: `${commomTips} 请上传图片`,
      type: 'error'
    })
    return false
  }
  if (!data.id) {
    Message({
      message: `${commomTips} 奖励佣金ID不能为空`,
      type: 'error'
    })
    return false
  }
  //  let flage = true
  // if (data.grad && data.grad.length > 0) {
  //   let item
  //   for (item of data.grad) {
  //     if (!item.desc) {
  //       Message({
  //         message: `${commomTips} 奖励描述不能为空`,
  //         type: 'error'
  //       })
  //       flage = false
  //       return false
  //     }
  //   }
  // }
  // if (!flage) return false
  return true
}
/**
 * @description 校验跳转时间
 */
export function validaJumpTime(rule, value, callback) {
  if (!value) {
    return callback(new Error('请输入内容'))
  }
  if (+value <= 0 || value > 30) {
    return callback(new Error('跳转时间在0-30秒之间'))
  }
  return callback()
}
/**
 * @description 获取全部优惠券Id
 */
export function validaCouponIds(type = 'addBuildBlock') {
  const ids = []
  store.getters[type].jmData.forEach(item => {
    if (item.name === 'jm-coupon' && item.businessData.id) {
      ids.push(item.businessData.id)
    }
  })
  store.getters[type].jmData.forEach(item => {
    if (item.name === 'jm-showcase' && item.businessData.showcaseConfig) {
      item.businessData.showcaseConfig.forEach(gtem => {
        if (gtem.jumpType === 5) {
          ids.push(gtem.couponId)
        }
      })
    }
  })
  if (ids.length < 1) return {}
  const cmomitData = {
    idList: ids,
    startTime: store.getters[type].titleData.isForever ? null : store.getters[type].titleData.startTime,
    endTime: store.getters[type].titleData.isForever ? null : store.getters[type].titleData.endTime
  }
  return cmomitData
}
/**
 * @description 获取全局奖励佣金ids
 */
export function validaSalesIds(type = 'addBuildBlock') {
  const ids = []
  store.getters[type].jmData.forEach(item => {
    if (item.name === 'jm-salse' && item.businessData.id) {
      ids.push(item.businessData.id)
    }
  })
  if (ids.length < 1) return {}
  const cmomitData = {
    idList: ids,
    startTime: store.getters[type].titleData.isForever ? null : store.getters[type].titleData.startTime,
    endTime: store.getters[type].titleData.isForever ? null : store.getters[type].titleData.endTime
  }
  return cmomitData
}
/**
 * @description 校验商品组件数据
 * @param {Object} tData 商品组件数据
 * @param {Number} index 下标
 * @returns {Boolean}
 */
export function validaProducts(tData, index, type = 'addBuildBlock') {
  const data = tData.businessData || {}
  const commomTips = `${index + 1}.${tData.label}:` // 公共提示语
  if ([0, 3].includes(data.styleType)) {
    if (!data.titleTextColor) {
      Message({
        message: `${commomTips} 请设置标题颜色`,
        type: 'error'
      })
      return false
    }
  }
  if (store.getters[type].titleData.isShowMuch) {
    if (!data.muchColor) {
      Message({
        message: `${commomTips} 请设置赚多少颜色`,
        type: 'error'
      })
      return false
    }
  }
  if ([1, 2].includes(data.styleType)) {
    if (!data.priceTextColor) {
      Message({
        message: `${commomTips} 请设置价格文字色`,
        type: 'error'
      })
      return false
    }
  }
  if (!data.productBgImg) {
    Message({
      message: `${commomTips} 请上传图片`,
      type: 'error'
    })
    return false
  }
  if (data.bgType === 0) {
    if (!data.wrapperBgColor) {
      Message({
        message: `${commomTips} 请设置背景样式纯色`,
        type: 'error'
      })
      return false
    }
  }
  if (data.bgType === 1) {
    if (!data.wrapperBgImg) {
      Message({
        message: `${commomTips} 请上传图片`,
        type: 'error'
      })
      return false
    }
  }
  if (!data.actId || !data.product || data.product.length < 1) {
    Message({
      message: `${commomTips} 请添加商品`,
      type: 'error'
    })
    return false
  }
  if (!data.showProNum || data.showProNum <= 0) {
    Message({
      message: `${commomTips} 展示商品数不能为空，且为正整数`,
      type: 'error'
    })
    return false
  }
  if (data.showProNum > data.product.length) {
    Message({
      message: `${commomTips} 展示商品数不能大于商品数`,
      type: 'error'
    })
    return false
  }
  // 校验通过执行
  return true
}
/**
 * @description 获取全局banner组件活动 活动id 是否可用
 * @returns {Array} ids
 */
export function validateBannerProductIds(type) {
  const ids = []
  store.getters[type].jmData.forEach(item => {
    if (item.name === 'jm-banner' && item.businessData.items) {
      item.businessData.items.forEach(gtem => {
        if (gtem.jumpType === 2) {
          ids.push({
            id: gtem.activityId,
            activityType: gtem.activityType,
            pfChannel: +sessionStorage.getItem('CHANNEL_ID') || 36,
            startTime: store.getters[type].titleData.isForever ? null : store.getters[type].titleData.startTime,
            endTime: store.getters[type].titleData.isForever ? null : store.getters[type].titleData.endTime
          })
        }
      })
    }
    if (item.name === 'jm-timingSwitch' && item.businessData.jumpType === 2) {
      ids.push({
        id: item.businessData.activityId,
        activityType: item.businessData.activityType,
        pfChannel: +sessionStorage.getItem('CHANNEL_ID') || 36,
        startTime: store.getters[type].titleData.isForever ? null : store.getters[type].titleData.startTime,
        endTime: store.getters[type].titleData.isForever ? null : store.getters[type].titleData.endTime
      })
    }
  })
  return ids
}
/**
 * @description 获取全局的专题Ids
 * @returns {Object}
 */
export function getSpecialIds(type) {
  const ids = []
  store.getters[type].jmData.forEach(item => {
    if (item.name === 'jm-banner' && item.businessData.items) {
      item.businessData.items.forEach(gtem => {
        if (gtem.jumpType === 1) {
          ids.push(gtem.specialId)
        }
      })
    }
    if (item.name === 'jm-showcase' && item.businessData.showcaseConfig) {
      item.businessData.showcaseConfig.forEach(gtem => {
        if (gtem.jumpType === 1) {
          ids.push(gtem.specialId)
        }
      })
    }
    if (item.name === 'jm-timingSwitch' && item.businessData.jumpType === 1) {
      ids.push(item.businessData.specialId)
    }
  })
  if (ids.length < 1) {
    return {}
  } else {
    return {
      specialIds: ids.join(','),
      startTime: store.getters[type].titleData.isForever ? null : store.getters[type].titleData.startTime,
      endTime: store.getters[type].titleData.isForever ? null : store.getters[type].titleData.endTime
    }
  }
}
/**
 * @description 全局校验活动ID 是否有效
 * @returns {Array}
 */
export function validaProductsAct(type) {
  const ids = []
  store.getters[type].jmData.forEach(item => {
    if (item.name === 'jm-products' && item.businessData.actId) {
      ids.push({
        id: item.businessData.actId,
        activityType: item.businessData.actType,
        startTime: store.getters[type].titleData.isForever ? null : store.getters[type].titleData.startTime,
        endTime: store.getters[type].titleData.isForever ? null : store.getters[type].titleData.endTime,
        pfChannel: +sessionStorage.getItem('CHANNEL_ID') || 36
      })
    }
  })
  store.getters[type].jmData.forEach(item => {
    if (item.name === 'jm-showcase' && item.businessData.showcaseConfig) {
      item.businessData.showcaseConfig.forEach(gitem => {
        if (gitem.jumpType === 2) {
          ids.push({
            id: gitem.activityId,
            activityType: gitem.activityType,
            startTime: store.getters[type].titleData.isForever ? null : store.getters[type].titleData.startTime,
            endTime: store.getters[type].titleData.isForever ? null : store.getters[type].titleData.endTime,
            pfChannel: +sessionStorage.getItem('CHANNEL_ID') || 36
          })
        }
      })
    }
  })
  return ids
}
/**
 * @description 校验全局banner 商品ids是否有效 productCode
 * @returns {Array}
 */
export function validaProductList(type) {
  const ids = []
  // banner
  store.getters[type].jmData.forEach(item => {
    if (item.name === 'jm-banner' && item.businessData.items) {
      item.businessData.items.forEach(gtem => {
        if (gtem.jumpType === 0) {
          ids.push(gtem.productCode)
        }
      })
    }
    if (item.name === 'jm-showcase' && item.businessData.showcaseConfig) {
      item.businessData.showcaseConfig.forEach(gtem => {
        if (gtem.jumpType === 0) {
          ids.push(gtem.productCode)
        }
      })
    }
    if (item.name === 'jm-timingSwitch' && item.businessData.jumpType === 0) {
      ids.push(item.businessData.productCode)
    }
  })
  return ids
}
/**
 * @description 全局校验橱窗组件
 * @returns {Boolean}
 */
export function validateShowCaseData(tData, index) {
  const data = tData.businessData || {}
  const commomTips = `${index + 1}.${tData.label}:` // 公共提示语
  if (!data.showItemNum) {
    Message({
      message: `${commomTips} 请填写展示橱窗个数`,
      type: 'error'
    })
    return false
  }
  if (!data.rowNum || data.rowNum > 2) {
    Message({
      message: `${commomTips} 橱窗排数大于0且小于2`,
      type: 'error'
    })
    return false
  }
  if (data.showcaseConfig.length < 1) {
    Message({
      message: `${commomTips} 橱窗个数不能小于0`,
      type: 'error'
    })
    return false
  }
  if (data.showItemNum * 1 > data.showcaseConfig.length) {
    Message({
      message: `${commomTips} 橱窗个数不能小于橱窗排数 `,
      type: 'error'
    })
    return false
  }
  return true
}
/**
 * @description 检验定时切换组件
 * @returns {Boolean}
 */
export function validateSwitchTime(tData, index) {
  const data = tData.businessData || {}
  const commomTips = `${index + 1}.${tData.label}:` // 公共提示语
  if (!data.switchTime) {
    Message({
      message: `${commomTips} 请选择切换时间`,
      type: 'error'
    })
    return false
  }
  if (!data.initImg || !data.switchImg) {
    Message({
      message: `${commomTips} 请上传图片`,
      type: 'error'
    })
    return false
  }
  if (data.jumpType === 0 && !data.productCode) {
    Message({
      message: `${commomTips} 商品Id不能为空`,
      type: 'error'
    })
    return false
  }
  if (data.jumpType === 1 && !data.specialId) {
    Message({
      message: `${commomTips} 专题Id不能为空`,
      type: 'error'
    })
    return false
  }
  if (data.jumpType === 2 && !data.activityId) {
    Message({
      message: `${commomTips} 活动Id不能为空`,
      type: 'error'
    })
    return false
  }
  return true
}
/**
 * @description 获取橱窗组件配置专题的模块名称
 * @returns {Array}
 */
export function getUseLabels(type) {
  const useLabels = []
  store.getters[type].jmData.forEach(item => {
    if (item.name === 'jm-showcase' && item.businessData.showcaseConfig) {
      item.businessData.showcaseConfig.forEach(gtem => {
        if (gtem.jumpType === 1 && gtem.specialId && gtem.moduleName) {
          useLabels.push({
            specialId: gtem.specialId.replace(/^(\s|\xA0)+|(\s|\xA0)+$/gi, ''),
            useLabel: gtem.moduleName
          })
        }
      })
    }
  })
  return useLabels
}
