import request from '@u/http'
import qs from 'qs'
export async function getList(data) {
  return request({
    url: 'http://121.33.205.118:3202/shelf/listShelf.asyn',
    // headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    method: 'POST',
    data: qs.stringify(data)
  })
}
