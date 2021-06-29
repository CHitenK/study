import Taro from '@tarojs/taro'

import Config from './config'

const HTTP = ({
  url,
  data,
  header,
  method,
  dataType,
  responseType
}) => {
  // 初始化 header
  if (!header) header = {};
  // 设置 cookie
  header['Application-Key'] = Config.APP_KEY
  header["Access-Token"] = Taro.getStorageSync('token') || ''
  header['Cache-Control'] = 'max-age=60';
  // 返回 promise
  return new Promise((resolve, reject) => {
    // 调用 wx请求接口
    Taro.request({
      url: Config.BASE_URL + url,
      data: data,
      header: header,
      method: method || 'GET',
      dataType: dataType,
      responseType: responseType,
      mode: 'cors',
      success: (res) => {
        if (res.statusCode !== 200 && res.statusCode !== 301 && res.statusCode !== 302) {
          reject({ resultMsg: '请求出错了' })
        }
        if (+res.data.resultCode === 0) {
          resolve(res.data.data)
        } else if (+res.data.resultCode === 401) { // 未登录
          if (!Taro.getStorageSync('can401')) {
           setTimeout(() => {
            Taro.showToast({
              title: '请先登录',
              icon: 'none',
              duration: 2000
            })
           }, 2000)
            Taro.setStorageSync('can401', true)
            Taro.navigateTo({
              url: '/pages/login/index'
            })
          }
          Taro.setStorageSync('userInfo', {})
          reject(res.data)
        } else {
          reject(res.data)
        }
      },
      fail: (res) => {
        reject(res);
      },
      complete: () => { }
    });
  });
};

export default HTTP