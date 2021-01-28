<template>
  <div class="home">
    <!-- 导航栏 -->
    <div class="header">
      <van-nav-bar
        fixed
        title="书架"
        right-text="清空"
        @click-right="onClickRight"
      >
      </van-nav-bar>
    </div>
    <div class="content">
      <van-checkbox-group v-model="result" ref="checkboxGroup">
        <van-swipe-cell
          v-for="(item, index) in books"
          :key="index"
          :index="index"
          :before-close="beforeClose"
        >
          <div class="book">
            <div class="book-left">
              <van-checkbox :name="index"></van-checkbox>
            </div>
            <div class="book-right">
              <van-card class="goods-card" :thumb="item.Book.Image">
                <template #tags>
                  <div>
                    <p>{{ item.Book.Name }}</p>
                    <p>{{ item.Book.Author.Name }}</p>
                  </div>
                </template>
              </van-card>
            </div>
          </div>
          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              class="delete-button"
            />
          </template>
        </van-swipe-cell>
      </van-checkbox-group>
    </div>

    <div class="footer">
      <van-submit-bar
        :price="1"
        label="共计: "
        :suffix-label="choseBooks"
        button-text="提交订单"
        button-color="rgb(123, 174, 177)"
        @submit="onSubmit"
      >
        <van-checkbox v-model="allCheck" @click="chose">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import bookShelf from "@/mixins/bookShelf";
import { delBook, clearBook, submitOrder } from "@/api/BookShelf";
import { mapMutations } from "vuex";
export default {
  mixins: [bookShelf],
  data: function () {
    return {
      result: [],
      books: [],
      allCheck: false,
      choseBooks: "0本",
      userId: null,
    };
  },
  methods: {
    //徽标
    ...mapMutations(["changeBadge"]),

    //清空书架按钮
    onClickRight() {
      clearBook(this.userId).then((res) => {
        console.log(res);
        if (res.Code === 100) {
          this.books = [];
          this.changeBadge(0);
          this.$toast(res.Message);
        } else {
          this.$toast(res.Message);
        }
      });
    },
    onSubmit() {
      if (this.allCheck == true) {
        submitOrder(this.userId).then((res) => {
          if (res.Code === 100) {
            this.books = [];
            this.changeBadge(0);
            this.$toast(res.Message);
            this.allCheck = false;
          } else {
            this.$toast(res.Message);
          }
        });
      }
    },

    //单个删除
    async delItemBook(index) {
      let bookId = this.books[index].Book.Id;
      const res = await delBook({ readerId: this.userId, bookId: bookId });
      if (res.Code === 100) {
        this.books.splice(index, 1);
        this.changeBadge(this.books.length);
        this.$toast(res.Message);
      }
    },

    beforeClose({ position, instance }) {
      switch (position) {
        case "right":
          console.log(this.$root);
          let confirmItemIndex = instance.$attrs.index;
          this.$dialog
            .confirm({
              title: "删除提示",
              message: `${this.books[confirmItemIndex].Book.Name}`,
            })
            .then(() => {
              this.delItemBook(instance.$attrs.index);
            })
            .catch(() => {});
          break;

        case "outside":
          instance.close();
      }
    },

    //书籍全选全不选
    chose() {
      if (this.allCheck) {
        this.$refs.checkboxGroup.toggleAll(true);
      }
      if (!this.allCheck) {
          this.$refs.checkboxGroup.toggleAll();
      }
    },

    change() {
      console.log("object");
    },
  },
  created() {
    this.getBookNum().then((res) => {
      this.books = res.Data;
    });
    this.userId = JSON.parse(localStorage.getItem("user")).Id;
  },
  watch: {
    result: function () {
      if (this.result.length == this.books.length) {
        this.allCheck = true;
      }
      if (this.result.length !== this.books.length) {
        this.allCheck = false;
      }
      this.choseBooks = `${this.result.length}本`;
    },
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
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header {
  z-index: 1000;
  margin-bottom: 46px;
}
.content {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 50px;
}
.van-nav-bar {
  background-color: #7baeb1 !important;
  color: #fff !important;
}
.goods-card {
  margin: 0;
}

.delete-button {
  height: 100%;
}
.book {
  display: flex;
  flex-direction: row;
}
.book .book-right {
  flex: 1;
}
.book .book-right p {
  font-size: 14px;
  margin-bottom: 20px;
  margin-top: 10px;
}
.book .book-left {
  width: 20px;
  margin: auto;
  margin-left: 5px;
}
/deep/ .van-submit-bar__price {
  display: none;
}
/deep/ .van-submit-bar {
  bottom: 49px;
}
/deep/ .van-checkbox {
  position: absolute;
  left: 10px;
}
/deep/ .van-card {
  background-color: transparent;
}
</style>
