<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" /> -->
    <router-view></router-view>
  </div>
</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,body {
  height: 100%;
  overflow: hidden;
  line-height: 1;
}
#app {
  height: 100%;
  overflow: hidden;
}
div {
  display: block;
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
