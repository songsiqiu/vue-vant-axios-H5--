import http from '../util/http'

//轮播图
export function swiperImgs(data) {
  return http({
    url: '/librarywebapi/member/login',
    method: 'post',
    data: data
  })
}

//搜索图书
export function searchByKeyWord(data) {
  return http({
    url: '/librarywebapi/book/list?keyword='+data,
    method: 'get'
  })
}