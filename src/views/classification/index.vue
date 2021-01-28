<template>
  <div class="home">
    <!-- 导航栏 -->
    <div class="header">
      <van-nav-bar fixed title="图书分类"> </van-nav-bar>
    </div>
    <div class="sideBar">
      <van-tree-select
        height="85vh"
        :items="items"
        :main-active-index.sync="active"
        @click-nav="clickNav"
      >
        <template #content>
          <div v-if="booksExist">
            <van-grid :column-num="2">
              <van-grid-item v-for="(item, index) in books" :key="index">
                <van-image :src="item.Book.Image" />
                <span class="bookText">{{ item.Book.Name }}</span>
              </van-grid-item>
            </van-grid>
          </div>
          <div v-if="!booksExist">
            <van-empty image="error" description="图书正在赶来的路上" />
          </div>
        </template>
      </van-tree-select>
    </div>
  </div>
</template>

<script>
// import { mapMutations } from 'vuex'
import { sideBar, classBooks } from "@/api/classification";
export default {
  data: function () {
    return {
      active: 0,
      items: [{ text: "全部" }],
      books: [],
      booksExist: true,
    };
  },
  methods: {
    // ...mapMutations(['changeIndex']),
    getBar() {
      sideBar()
        .then((data) => {
          for (let item of data.Data) {
            item.text = item.Name;
            this.items.push(item);
          }
        })
        .catch((err) => {
          this.$toast("侧边栏获取失败" + err);
        });
    },
    //分类图书
    clickNav(index) {
      classBooks(this.items[index].Id)
        .then((data) => {
          this.books = data.Data;
          if (data.Data.length == 0) {
            this.booksExist = false;
          }
          if (data.Data.length != 0) {
            this.booksExist = true;
          }
        })
        .catch((err) => {
          this.$toast("图书信息获取失败" + err);
        });
    },
  },
  created() {
    this.getBar();
    this.clickNav(0);
    // this.changeIndex(1)
  },
};
</script>

<style lang='less' scoped>
.header {
  z-index: 1000;
  height: 46px;
}
/deep/ .van-nav-bar__title {
  color: #fff;
}
/deep/ .van-nav-bar__text {
  color: #fff;
}
.sidebarWidth {
  width: 80px;
}
.van-tree-select__nav-item {
  padding: 20px 12px;
}
/deep/ .van-tree-select__nav {
  -webkit-box-flex: none;
  -webkit-flex: none;
  flex: none;
}
/deep/ .van-sidebar-item--select::before {
  background-color: #7baeb1;
}
/deep/ .van-empty {
  margin-top: 50%;
}
.van-nav-bar {
  background-color: #7baeb1 !important;
  color: #fff !important;
}
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.sideBar {
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
