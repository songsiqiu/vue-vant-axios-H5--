<template>
  <div class="home">
    <div class="header">
      <van-nav-bar title="收货地址" left-arrow @click-left="onClickLeft" />
    </div>

    <div class="content">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        :disabled-list="disabledList"
        disabled-text="以下地址超出配送范围"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      />
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      chosenAddressId: "1",
      list: [
        {
          id: "1",
          name: "张三",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
          isDefault: true,
        },
        {
          id: "2",
          name: "李四",
          tel: "1310000000",
          address: "浙江省杭州市拱墅区莫干山路 50 号",
        },
      ],
      disabledList: [
        {
          id: "3",
          name: "王五",
          tel: "1320000000",
          address: "浙江省杭州市滨江区江南大道 15 号",
        },
      ],
    };
  },
  methods: {
    onClickLeft() {
      window.history.back();
    },
    addAddress() {},
    onAdd() {
      console.log("添加");
    },
    onEdit(item, index) {
      console.log("编辑");
    },
  },
  created() {},
};
</script>

<style lang='less' scoped>
/deep/ .van-button {
  background-color: #7baeb1;
  border: 0px;
}
/deep/ .van-button__text {
  color: #fff;
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
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header {
  z-index: 1000;
  height: 46px;
}
.content {
  flex: 1;
  overflow-y: auto;
}
</style>
