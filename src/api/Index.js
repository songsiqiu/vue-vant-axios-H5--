import http from '../util/http'

//轮播图
export function swiperImgs() {
  return http({
    url:'/librarywebapi/advert/list',
    method:'get'
  })
}

//图书信息
export function booksInfo()  {
  return http({
    url:'/librarywebapi/section/list',
    method:'get'
  })
}