<template>
  <div class="home">
    <div class="header">
      <van-nav-bar title="订单详情" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="wrap">
      <van-tabs v-model="active">
        <van-tab title="当前借阅">
          <currentBorrow :list = "currentList" v-on:removeBook="removeCurrentItem"></currentBorrow>
        </van-tab>
        <van-tab title="借阅记录">
          <recordBorrow :list = "doneList"></recordBorrow>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { getBorrowRecords} from "@/api/my";
import currentBorrow from "../components/currentBorrow"
import recordBorrow from "../components/recordBorrow"
export default {
  data: function () {
    return {
      active: 0,
      userId: null,
      currentList:[],
      doneList:[]
    };
  },
  components: {
    currentBorrow,
    recordBorrow
  },
  methods: {
    removeCurrentItem(id){
      for(let i = 0; i < this.currentList.length; i++) {
        if(this.currentList[i].Id === id) {
          this.doneList.unshift(this.currentList[i])
          this.currentList.splice(i,1)
        }
      }
    },
    onClickLeft() {
      window.history.back();
    },
  },
  created() {
    this.userId = JSON.parse(localStorage.getItem("user")).Id;
    getBorrowRecords(this.userId).then((res) => {
      if (res.Code === 100) {
        console.log(res);
        let list = res.Data;

      //把图书根据state分类
        this.currentList = []
        this.doneList = []
        for(let i = 0; i< list.length ; i++) {
          if(list[i].State === 0 || list[i].State === 4) {
            this.doneList.push(list[i])
          }else{
            this.currentList.push(list[i])
          }
        }

      } else {
        this.$toast(res.Message);
      }
    });
  },
};
</script>

<style lang='less' scoped>
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header {
  z-index: 1000;
  height: 46px;
}
.wrap {
  display: flex;
  height: 100%;
  flex-direction: column;
}
/deep/ .van-tabs__content {
  flex: 1;
  height: 87vh;
  overflow-y: auto;
}
/deep/ .van-nav-bar__title {
  color: #fff;
}
/deep/ .van-nav-bar .van-icon {
  color: #fff;
}
/deep/ .van-nav-bar__content {
  background-color: #7baeb1;
  border: 0px;
}
/deep/ .van-card {
  background-color: #fff;
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
