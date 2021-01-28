<template>
  <div>
    <div class="searchResult" ref="test">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
      >
        <van-card
          v-for="(item, index) in list"
          :key="index"
          :thumb="item.Book.Image"
          @click="itemBook(item)"
        >
          <template #desc>
            <h2>{{ item.Book.Name }}</h2>
            <p>{{ item.Book.Author.Name }}</p>
            <p>{{ item.Book.PublishDate }}</p>
            <p>{{ item.Book.Publisher.Name }}</p>
          </template>
        </van-card>
      </van-list>
    </div>
  </div>
</template>

<script>
import { searchByKeyWord } from "@/api/user";
export default {
  data: function () {
    return {
      loading: false,
      finished: true,
      list: [],
      active:true
    };
  },
  methods: {
    itemBook(item) {
      let scrollTop = document.querySelector(".searchBook").scrollTop;
      sessionStorage.setItem("searchBookTop", scrollTop);
      console.log(scrollTop, "离开时的scrollTop");
      this.$router.push({ name: "Detail", params: { id: item.Book.Id } });
    },
  },
  created() {
    let key = this.$route.query.key;
    //开始搜索
    searchByKeyWord(key).then((data) => {
      this.list = data.Data;
    });
  },
  activated() {
     this.active = true
  },
  updated () {
    // if(this.active) {
    //   //调用的父组件的方法
    //   this.$parent.sc();
    //   console.log("object");
    // }
  },
  deactivated() {},
};
</script>

<style lang='less' scoped>
.searchBook h2 {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
}
.searchResult p {
  color: #999;
  margin-bottom: 5px;
}
</style>
