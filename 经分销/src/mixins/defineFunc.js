import * as Api from '@a/base/index'

// 需要声明的函数集合
const funcsNamArr = [
  'getSelectList', // 通过listName常量集合名称 获取各下拉列表数据
  'getSelectBeanByMerchantRel', // 获取仓库
  'getBUSelectBean', // 获取事业部
  'getBrandSelectBean', // 获取商品品牌
  'getCustomerSelectBean', // 获取客户
  'getCurrencySelectBean', // 获取币种
  'getSupplierList', // 获取供应商列表
  'getSelectMerchantBean', // 获取公司
  'getSelectBeanByDto', // 获取 客户信息下拉列表
  'getSelectCustomsArea', // 获取 入库管区下拉列表
  'getRaxList', // 获取税率下拉数据
  'getPackTypeSelectBean', // 获取包装方式下拉列表
  'getdepotArrList', // 获取仓库地址下拉列表
  'getSelectBeanByMerchantBuRel', // 根据事业部查询关联的仓库
  'getBusinessModuleType', // 获取业务模块
  'getDepotSelectBean', // 获取仓库
  'getAllSelectBean', // 根据页面传入多个关联仓库获取此商家下仓库关联的事业部下拉框，为空时则获取商家关联的所有事业部（多个仓库的情况）
  'getPackTypeSelectList', // 获取包装方式下拉
  'getSupplierByMerchantId', // 根据商家Id获取供应商
  'getCustomerByMerchantId', // 根据公司id获取客户列表
  'getBrandList', // 获取母品牌下拉列表
  'getMerchandiseCatList', // 公共方法获取商品分类下拉列表
  'getSelectBeanByUserId', // 获取用户关联的事业部
  'getFileTemp', // 获取模板下拉
  'getSupplierSelectBean', // 获取供应商下拉列表
  'getCustomsSelectBean', // 获取关区下拉列表
  'getBrandParent', // 获取标准品牌下拉
  'getSelectSDlist', // 销售sd下拉列表
  'getPlatformCostConfigSelectBean', // 获取平台费项列表
  'getSupplierMerchantRelByMainIdURL' // 获取客户列表
]

// 下列列表的值取 属性key 和 value 的集合
const attrKeyAdnValueArr = [
  'getSelectList',
  'getBusinessModuleType'
]

// 声明函数的对象
const funcsObj = {}

/**
 *  统一声明获取下拉列表数据函数
 *  selectOpt vm 属性 Object
 *  name  属性名
 *  data 参数 Object
 *  keyObj 对象 处理获取返回数据的属性 { key: 'id', vlaue: 'name, code: '' } 代表 key 取 item.id, vlaue: 取item.name, code 取值item.code
 *  callback 函数
 */
 funcsNamArr.forEach(item => {
  funcsObj[item] = async function(name, data, keyObj, callback) {
    // this 指向当前vue对象
    if (this.selectOpt[name] !== undefined) return false // 拦截多次请求
    let list = []
    try {
      this.$set(this.selectOpt, `${name}`, []) // 设置空数组，防止多次请求
      if (item === 'getSelectList') data = name // 兼容旧写法
      const res = await Api[item](data)
      res.data && res.data.map(gtem => {
        let key = ''
        let value = ''
        let selfObj = {}
        if (keyObj && Object.keys(keyObj).length > 0) { // 取传入的key
          for (let k in keyObj) {
            selfObj[k] = gtem[keyObj[k] || k]
          }
        } else if (attrKeyAdnValueArr.includes(item)) {
          key = gtem.key
          value = gtem.value
        } else if (item === 'getCurrencySelectBean') { // 兼容币种
          key = gtem.selectValue
          value = gtem.selectLable
        } else {
          key = gtem.value
          value = gtem.label
        }
        list.push({ key, value, ...selfObj })
      })
    } catch (err) {
      list = []
    }
    this.$set(this.selectOpt, `${name}`, list)
    if (callback && typeof callback === 'function') callback(list)
    return null
  }
})

export default funcsObj
