<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in images" :key="index">
        <img :src="item.Image" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  props:['images'],
  data: function () {
    return {
    };
  },
};
</script>

<style scoped>
  .my-swipe .van-swipe-item {
    height: 25vh;
  }
  .van-swipe-item img {
    height: 24vh;
  }
</style>
