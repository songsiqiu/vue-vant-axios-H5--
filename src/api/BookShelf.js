import http from '../util/http'

export function addBookShelf(params) {
  return http({
    url:'/librarywebapi/Transaction/AddBookShelf',
    method:'get',
    params:{
      readerId:params.Id,
      bookId:params.bookId
    }
  })
}

export function myShelf(id){
  return http({
    url:'/librarywebapi/Transaction/GetMyShelf',
    method:'get',
    params:{
      readerId:id
    }
  })
}

export function delBook(params) {
  return http({
    url:'/librarywebapi/Transaction/RemoveBookFromShelf',
    method:'get',
    params:{
      readerId:params.readerId,
      bookId:params.bookId
    }
  })
}

//清空书架
export function clearBook(readerId){
  return http({
    url:'/librarywebapi/Transaction/RemoveMyShelf',
    method:'get',
    params:{
      readerId
    }
  })
}

//提交订单,实现借阅
export function submitOrder(readerId){
  return http({
    url:'/librarywebapi/Transaction/SubmitOrder',
    method:'post',
    data:{
      readerId
    }
  })
}