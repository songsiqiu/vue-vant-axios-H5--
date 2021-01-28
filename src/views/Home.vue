<template>
  <div class="home">
    <div class="content">
      <div class="wrap">
        <router-view></router-view>
      </div>
    </div>

    <div class="footer">
      <!-- 标签栏 -->
      <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o" to="/index" name="Index"
          >首页</van-tabbar-item
        >
        <van-tabbar-item icon="apps-o" to="/class" name="Class"
          >分类</van-tabbar-item
        >
        <van-tabbar-item
          v-if="badge"
          icon="bar-chart-o"
          to="/bookshelf"
          :badge="badge"
          name="BookShelf"
          >书架</van-tabbar-item
        >
        <van-tabbar-item
          v-if="!badge"
          icon="bar-chart-o"
          to="/bookshelf"
          name="BookShelf"
          >书架</van-tabbar-item
        >
        <van-tabbar-item icon="manager-o" to="/my"  name="My"
          >我的</van-tabbar-item
        >
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import bookShelf from "@/mixins/bookShelf"
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
export default {
  mixins: [bookShelf],
  name: "Home",
  components: {},
  data: function () {
    return {
      active: this.$route.name,
      title: "",
    };
  },
  computed:{
    ...mapState(['badge'])
  },
  methods: {
    ...mapMutations(['changeBadge'])
  },
  created() {
    //书架徽标
    this.getBookNum().then((res)=>{
      let badge = res.Data.length
      this.changeBadge(badge)
    })
  },
};
</script>

<style lang='less' scoped>
.home {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1;
  overflow: hidden;
  margin-bottom: 50px;
}
.wrap {
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}
/deep/ .van-nav-bar {
  background-color: #7baeb1 !important;
  color: #fff !important;
}
/deep/ .van-icon-arrow-left:before {
  color: #fff;
}
/deep/ .van-nav-bar__title {
  color: #fff;
}
</style>
