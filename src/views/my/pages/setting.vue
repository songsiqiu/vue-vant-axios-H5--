<template>
  <div>
    <van-nav-bar title="设置" left-arrow @click-left="onClickLeft" />
    <van-cell title="帮助中心" is-link />
    <van-cell title="意见反馈" is-link />
    <van-cell title="关于软件" is-link />
    <div class="">
      <van-button type="submit" size="large" round @click="loginOut" v-if="live"
        >注销登录</van-button
      >
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
  data: function () {
    return {
      live:true
    };
  },
  methods: {
    onClickLeft() {
      window.history.back();
    },
    loginOut() {
      Dialog.confirm({
        title: "您要注销当前账号吗",
      })
        .then(() => {
          // on confirm
          localStorage.removeItem('user')
          this.$toast("注销成功")
          this.live = false
        })
        .catch(() => {
          // on cancel
          this.$toast("取消注销")
        });
    },
  },
  created () {
    if(localStorage.getItem('user') == null){
      this.live=false
    }
  }
};
</script>

<style lang='less' scoped>
/deep/ .van-button {
  margin-top: 30px;
  background-color: #7baeb1;
  border: 0px;
}
/deep/ .van-button__text  {
  color: #fff;
}
/deep/ .van-nav-bar__title  {
  color: #fff;
}
/deep/ .van-nav-bar .van-icon {
  color: #fff;
}
/deep/ .van-nav-bar__content {
  background-color: #7baeb1;
  border: 0px;
}
</style>
