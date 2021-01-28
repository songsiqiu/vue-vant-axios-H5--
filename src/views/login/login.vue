<template>
  <div>
    <van-nav-bar title="登录" left-arrow @click-left="onClickLeft" />

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
     
    };
  },
  methods: {
    
    onClickLeft() {
      window.history.back();
    },
  },
};
</script>

<style lang='less' scoped>
/deep/ .van-nav-bar {
  background-color: #7baeb1 !important;
  color: #fff !important;
}
/deep/ .van-button {
  background-color: #7baeb1;
}
/deep/.van-nav-bar__title {
 color: #fff;
}
/deep/ .van-nav-bar .van-icon {
  color: #fff;
}
</style>
