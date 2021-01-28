import http from '../util/http'

//侧边栏分类
export function sideBar() {
  return http({
    url:'/librarywebapi/category/list',
    method:'get'
  })
}

//分类图书
export function classBooks(categoryId) {
  if(!categoryId) {
    categoryId=''
  }
  return http({
    url:'/librarywebapi/book/list?categoryId='+categoryId,
    data:categoryId
  })
}