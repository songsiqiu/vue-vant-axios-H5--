<template>
  <div class="tag" >
      <div v-for="(item, index) in key" :key="index" class="litteTag">
        <van-tag
          closeable
          size="large"
          type="primary"
          round
          color="#7baeb1"
          @close="close(index)"
        >
          {{ item }}
        </van-tag>
      </div>
    </div>
</template>

<script>
export default {
  data:function() {
    return {
       value: "",
    }
  },
  methods: {
    close(index) {
      this.key.splice(index, 1);
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
    // localStorage.removeItem('key')
  },
}
</script>

<style lang='less' scoped>
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
</style>
