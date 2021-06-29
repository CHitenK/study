const { request, ajaxJSON } = require('../utils/util.js')
const cf = require("../config/config.js").config;

module.exports = {
  totalOrder: function(cookie) {
    // 获取 订单分类统计
    return request({
      // url:  cf.postUrl + 'order/countMyOrders',
      url:  cf.postUrl + 'order/my/count',
      header: {
        'cookie': cookie
      }
    });
  },
  // 获取商品详情接口
  getProductDetail(id) {
    return ajaxJSON({
      url:  cf.cdnUrl + 'product/' + id + '.json',
      method: 'get'
    });
  }
}