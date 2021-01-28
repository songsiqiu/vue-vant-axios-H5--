import http from '../util/http'

//收获地址
// export function getAddress(data) {
//   return http({
//     url: '',
//     method: 'post',
//     data: data
//   })
// }

//查询读者的借阅记录
export function getBorrowRecords(readerId){
  return http({
    url:'/librarywebapi/Transaction/GetBorrowRecords',
    method:'post',
    params:{
      readerId
    }
  })
}

//取消订单
export function cancleOrderByIds(data) {
  return http({
    url:"/librarywebapi/Transaction/CancelOrder",
    method:"post",
    data:{
      orderId:data.orderId,
      readerId:data.readerId
    }
  })
}

//查询读者信息
export function queryReaderInfo(id) {
  return http({
    url:"/librarywebapi/member/single",
    method:"get",
    params:{
      id
    }
  })
}

//修改读者信息
export function modifyReaderInfo(data) {
  return http({
    url:'/librarywebapi/member/update',
    method:'post',
    data:data
  })
}