<template>
  <div class="home">
    <!-- 导航栏 -->
    <div class="header">
      <van-nav-bar fixed left-arrow @click-left="onClickLeft">
        <template #title>
          <van-search
            v-model="value"
            background="transparent"
            placeholder="请输入搜索关键词"
            shape="round"
            @search="onSearch"
            @input="searchVal"
          />
        </template>
      </van-nav-bar>
    </div>

    <div class="content" v-if="key.length == 0 && !showResult">
      <van-empty image="search" description="暂无搜索历史" />
    </div>

    <div class="tag" v-if="key.length > 0 && !showResult">
      <div style="margin-top: 1vh; color: #999">历史搜索 :</div>
      <div v-for="(item, index) in key" :key="index" class="litteTag">
        <van-tag
          closeable
          size="large"
          type="primary"
          round
          color="#7baeb1"
          @close="close(index)"
          @click="onSearch(item)"
        >
          {{ item }}
        </van-tag>
      </div>
    </div>

    <div class="searchBook" v-if="showResult">
      <!-- <keep-alive>
        <searchResult :list="list" ></searchResult>
      </keep-alive> -->
      <!-- <router-view></router-view> -->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" />
    </div>
  </div>
</template>

<script>
import searchResult from "@/views/home/pages/components/serchResult";
export default {
  data: function () {
    return {
      value: "",
      key: [],
      showResult: false,
      i: 0,
    };
  },
  components: {
    searchResult,
  },
  methods: {
    sc() {
      let top = Number(sessionStorage.getItem("searchBookTop"))
      console.log(top);
      document.querySelector(".searchBook").scrollTop = top;
       console.log(document.querySelector(".searchBook").scrollTop);
    },
    close(index) {
      this.key.splice(index, 1);
      localStorage.setItem("key", this.key);
    },
    onClickLeft() {
      this.value = null;
      // this.$router.go(-1);
      this.$router.back();
    },
    onSearch(val) {
      this.value = val;
      let repeatKey = false;
      for (let i = 0; i < this.key.length; i++) {
        if (this.key[i] === val) {
          repeatKey = true;
          break;
        }
      }

      if (repeatKey == false) {
        this.key.unshift(val);
        if (this.key.length > 5) {
          this.key.pop();
        }
        localStorage.setItem("key", this.key);
      }

      this.showResult = true;
      this.$router
        .push({ path: "/search/searchResult", query: { key: val } })
        .catch(() => {});
    },
    searchVal(val) {
      if (!val) {
        this.showResult = false;
      }
    },
  },

  created() {
    let oldKey = localStorage.getItem("key");
    if (oldKey) {
      this.key = oldKey.split(",");
    }
    if (this.key.length > 5) {
      this.key.pop();
    }

    //看页面的url上有没有key,如果有key展示搜索结果
    if (this.$route.query.key) {
      this.showResult = true;
      this.value = this.$route.query.key;
    }
  },
};
</script>

<style lang='less' scoped>
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
.home {
  display: flex;
  height: 100%;
  flex-direction: column;
}
.header {
  height: 46px;
}
.content {
  flex: 1;
  margin-top: 10vh;
  height: 100%;
  overflow-y: auto;
}
.tag {
  flex: 1;
}
.litteTag {
  display: inline-block;
}
/deep/.van-tag {
  // margin-top: 3vh;
  margin: 2vh;
}
.searchBook {
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
