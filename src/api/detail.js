import http from '../util/http'

export function getBookInfo(id) {
  return http({
    url:'/librarywebapi/book/single?id='+id,
    method:'get',
    data:id
  })
}