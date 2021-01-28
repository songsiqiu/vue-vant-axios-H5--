<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      :title="bookInfo.Book.Name"
      @click-left="onClickLeft"
      left-arrow
      v-if="bookInfo"
    />

    <div class="contain">
      <!-- 图片 -->
      <div class="wrapImg" v-if="bookInfo">
        <van-image
          width="12rem"
          height="12rem"
          fit="contain"
          :src="bookInfo.Book.Image"
        />
      </div>

      <!-- 内容区 -->
      <div class="container">
        <van-cell-group>
          <div>
            <van-cell title="书籍详情" class="cellText" />
            <van-cell v-if="bookInfo" class="bookD">
              <p>
                <label for="">书名</label>
                <span>{{ bookInfo.Book.Name }}</span>
              </p>
              <p>
                <label for="">作者</label>
                <span>{{ bookInfo.Book.Author.Name }}</span>
              </p>
              <p>
                <label for="">出版日期</label>
                <span>{{ bookInfo.Book.PublishDate }}</span>
              </p>
              <p>
                <label for="">出版社</label>
                <span>{{ bookInfo.Book.Publisher.Name }}</span>
              </p>
              <p>
                <label for="">数量</label>
                <span
                  >{{ bookInfo.Book.State }}/{{ bookInfo.Book.Amount }}</span
                >
              </p>
            </van-cell>
          </div>
          <div>
            <van-cell title="简介" class="cellText" />
            <van-cell v-if="bookInfo" class="bookI">
              {{ bookInfo.Book.Introduce }}
            </van-cell>
          </div>
        </van-cell-group>
      </div>
    </div>

    <!-- 标签栏 -->
    <van-goods-action>
      <van-goods-action-icon
        icon="bar-chart-o"
        :badge="badge"
        text="我的书架"
        color="rgb(123, 174, 177)"
        @click="onClickIcon"
      />
      <van-goods-action-button
        type="danger"
        text="加入书架"
        color="rgb(123, 174, 177)"
        @click="onClickButton"
      />
    </van-goods-action>
  </div>
</template>

<script>
import { getBookInfo } from "@/api/detail";
import { addBookShelf, myShelf } from "@/api/BookShelf";
import bookShelf from "@/mixins/bookShelf";

export default {
  mixins: [bookShelf],
  data: function () {
    return {
      bookId: "",
      bookInfo: "",
      active: -1,
      badge: 0,
      userId: "",
    };
  },
  methods: {
    getBook(id) {
      getBookInfo(id)
        .then((data) => {
          this.bookInfo = data.Data;
        })
        .catch((err) => {
          this.$toast("错误" + err);
        });
    },
    onClickIcon() {
      this.$router.push({ path: "/bookshelf" });
    },
    onClickButton() {
      addBookShelf({ Id: this.userId, bookId: this.bookId })
        .then((data) => {
          this.$toast(data.Message);
          if (data.Code == 100) {
            this.badge++;
          }
        })
        .catch((err) => {
          this.$toast(err);
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
  created() {
    this.bookId = this.$route.params.id;
    this.getBook(this.bookId);

    this.userId = JSON.parse(localStorage.getItem('user')).Id;

    // let num = this.getBookNum();
    // console.log(num, "hh");
    this.getBookNum().then((res) => {
      this.badge = res.Data.length
    });
    // let bagde = Number(length);
  },
};
</script>

<style lang='less' scoped>
/deep/ .van-nav-bar__title {
  color: #fff;
}
/deep/ .van-icon-arrow-left:before {
  color: #fff;
}
/deep/ .van-nav-bar {
  background-color: #7baeb1 !important;
}
.wrapImg {
  padding: 10px;
  text-align: center !important;
}
.cellText {
  font-size: 18px;
  color: #323232;
  font-weight: 500;
}
/deep/ .van-cell::after {
  border-bottom: 3px solid #7baeb1 !important;
}
.bookD p label {
  color: #999;
  font-size: 14px;
  margin-bottom: 10px;
  width: 80px;
  display: inline-block;
}
.bookD p span {
  font-size: 14px;
  color: #000;
  margin-bottom: 10px;
}
.bookI {
  font-size: 14px;
  font-weight: 0;
  text-indent: 28px;
}
/deep/ .van-cell__value--alone {
  color: #666;
}
.contain {
  height: 85vh;
  overflow-y: auto;
  margin-bottom: 1vh;
}
/deep/ .van-cell {
  padding: 5px 16px;
}
</style>
