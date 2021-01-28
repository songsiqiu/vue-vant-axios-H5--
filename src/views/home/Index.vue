<template>
  <div class="home">
    <!-- 导航栏 -->
    <div class="header">
      <van-nav-bar fixed>
        <template #title>
          <van-search
            v-model="value"
            background="transparent"
            placeholder="请输入搜索关键词"
            shape="round"
            @focus="goSearch"
          />
        </template>
      </van-nav-bar>
    </div>
    <div class="content">
      <!-- 轮播 -->
      <HomeSwiper :images="images"></HomeSwiper>

      <!-- 内容主题 -->
      <div>
        <Bar :barTitle="books[0].Name" v-if="books[0]"></Bar>
        <ClassBooks :books="books[0]" v-if="books[0]"></ClassBooks>

        <Bar :barTitle="books[1].Name" v-if="books[1]"></Bar>
        <ClassBooks :books="books[1]" v-if="books[1]"></ClassBooks>

        <Bar :barTitle="books[2].Name" v-if="books[2]"></Bar>
        <ClassBooks :books="books[2]" v-if="books[2]"></ClassBooks>
      </div>
    </div>
  </div>
</template>

<script>
import HomeSwiper from "@/views/home/components/HomeSwiper";
import Bar from "@/views/home/components/Bar";
import ClassBooks from "@/views/home/components/ClassBooks";
import { swiperImgs, booksInfo } from "@/api/Index";

export default {
  components: {
    HomeSwiper,
    Bar,
    ClassBooks,
  },
  data: function () {
    return {
      images: [],
      books: [],
      value: "",
    };
  },
  methods: {
    getImgs() {
      swiperImgs()
        .then((data) => {
          this.images = data.Data;
        })
        .catch((err) => {
          this.$toast("图片获取失败" + err);
        });
    },
    getBooks() {
      booksInfo()
        .then((data) => {
          this.books = data.Data;
        })
        .catch((err) => {
          this.$toast("图书信息获取失败" + err);
        });
    },
    goSearch() {
      this.$router.push("/search");
    },
  },
  created() {
    this.getImgs();
    this.getBooks();
    // this.$store.commit('changeIndex',0)
  },
};
</script>
<style lang='less' scoped>
/deep/ .van-nav-bar__title {
  color: #fff;
}
/deep/ .van-nav-bar__text {
  color: #fff;
}
.header {
  height: 46px;
}
.content {
  flex: 1;
  // overflow-x: hidden;
  overflow-y: auto;
}
.header {
  z-index: 1000;
}
.van-nav-bar {
  background-color: #7baeb1 !important;
  color: #fff !important;
}
.container {
  margin: 1.5vh 2vw;
}
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
