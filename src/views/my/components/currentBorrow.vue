<template>
  <div>
    <van-card
      v-for="(item, index) in list"
      :key="index"
      :thumb="item.BookImage"
    >
      <template #desc>
        <div class="bookmsg">
          <h2>{{ item.BookName }}</h2>
          <p>{{ item.AuthorName }}</p>
          <p>
            <van-steps :active="item.State" active-color="rgb(123, 174, 177)">
              <van-step>已提交</van-step>
              <van-step>配送中</van-step>
              <van-step>已签收</van-step>
            </van-steps>
          </p>
        </div>
      </template>

      <template #footer>
        <van-button
          type="warning"
          round
          size="small"
          @click="cancleOrder(item)"
          >取消订单</van-button
        >
      </template>
    </van-card>
  </div>
</template>

<script>
import {cancleOrderByIds } from "@/api/my";
export default {
  props:["list"],
  data: function () {
    return {
      userId:''
    };
  },
  methods: {
    removeBook(){
      this.$emit('removeBook',)
    },
     cancleOrder(item) {
      this.userId = JSON.parse(localStorage.getItem("user")).Id;
      cancleOrderByIds({readerId:this.userId,orderId:item.Id})
        .then((res)=>{
          if(res.Code === 100) {
            this.$toast("取消成功")
            this.$emit('removeBook',item.Id)
          }else{
            this.$toast(res.Message)
          }
        })
    }
  }
};
</script>

<style lang='less' scoped>
/deep/ .van-card {
  background-color: #fafafa !important;
}
.bookmsg h2{
      font-size: 16px;
    color: #000!important;
    margin-bottom: 10px;
}
.bookmsg p {
  margin-bottom: 10px;
}
/deep/ .van-tabs__line {
  background-color: rgb(123, 174, 177);
}
</style>
