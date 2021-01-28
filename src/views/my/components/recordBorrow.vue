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
          <p class="msg">订单已取消</p>
        </div>
      </template>
    </van-card>
  </div>
</template>

<script>
import {cancleOrderByIds } from "@/api/my";
export default {
  props:["list"],
  data: function () {
    return {};
  },
  methods: {
  },
  created () {
    console.log(this.list)
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
    margin-top: 10px;
}
.bookmsg p {
  margin-bottom: 10px;
}
/deep/ .van-tabs__line {
  background-color: rgb(123, 174, 177);
}
.msg {
  text-align: right;
  color: #7baeb1;
}
</style>
