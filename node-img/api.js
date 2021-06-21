const Axios = require('axios')
const qs = require('qs')

function getWxToken() {
  const data = {
    pageSize: 10,
    begin: 0,
    // ids: 324,
    token: '826aa9e7-dd8c-41b8-b258-5b7d0f83f9df'
  }
  return new Promise((resoved, reject) => {
      Axios({
          method: 'POST',
          url: 'http://121.33.205.118:3202/webapi/order/transfer/listTransferOrder.asyn',
          data: qs.stringify(data)
      }).then(res => {
         console.log(res)
      }).catch(err => {
        console.log(err, 999)
          reject(null)
      })
  })
}

getWxToken()