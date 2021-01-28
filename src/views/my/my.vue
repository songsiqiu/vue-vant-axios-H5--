<template>
  <div>
    <!-- 导航栏 -->
    <div class="header">
      <van-nav-bar fixed title="我的"> </van-nav-bar>
    </div>
    <div class="avatar">
      <div v-if="!userInfo">
        <router-link to="/login">
        <van-image width="6rem" height="6rem" round :src="avatar" />
        <h3 class="login">尚未登录</h3>
      </router-link>
      </div>
      
      <div>
        <router-link to="/edit" v-if="userInfo">
        <van-image width="6rem" height="6rem" round :src="userInfo.Header" />
        <h3 class="login">{{userInfo.Name}}</h3>
      </router-link>
      </div>
    </div>

    <van-cell-group>
      <van-cell title="订单详情" icon="shopping-cart-o" is-link to="/orderdetail" />
      <van-cell title="收货地址" icon="location-o" is-link to="/deliveryAddress" />
      <van-cell title="设置" icon="setting-o" is-link to="/setting" />
    </van-cell-group>
  </div>
</template>

<script>
import avatar from "@/assets/avatar.png";
export default {
  data: function () {
    return {
      avatar: avatar,
      userInfo:null
    };
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-nav-bar__title {
  color: #fff;
}
/deep/ .van-nav-bar__text {
  color: #fff;
}
.avatar {
  text-align: center;
  padding-bottom: 20px;
  margin-top: 10px;
  border-bottom: 1px solid #7baeb1;
}
.login {
  font-size: 16px;
  font-weight: 400;
}
.header {
  z-index: 1000;
  margin-bottom: 46px;
}
.van-nav-bar {
  background-color: #7baeb1 !important;
  color: #fff !important;
}
</style>
