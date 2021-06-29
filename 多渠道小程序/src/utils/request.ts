import Taro from '@tarojs/taro'

// 全局封装请求
function request({
  url = '',
  data = {},
  header = {},
  method = 'GET',
  dataType = "json",
  responseType = "text",
}: any): any {
  return new Promise((resolve, reject) => {
    // 调用 wx请求接口
    Taro.request({
        url: url,
        data: data,
        header: header,
        method: method,
        dataType: dataType,
        responseType: responseType,
        success: (res) => {
          // http异常状态拦截 
          if (res.statusCode == 401) { // 未登录
                    
          }
          const resData = res.data
          if (resData.resultCode + '' !==  '0') {
            reject(resData)
          } else {
            resolve(resData) 
          }
        },
        fail: (res) => {
            reject(res)
        },
        complete: () => {}
    });
  });
}

export default request