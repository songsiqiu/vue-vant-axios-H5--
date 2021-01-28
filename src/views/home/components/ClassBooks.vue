<template>
  <div class="books">
    <van-grid :column-num="3">
      <van-grid-item
        v-for="(item, index) in books.Books"
        :key="index"
        @click="clickBook(item)"
      >
        <van-image :src="item.Book.Image" />
        <span class="bookText">{{ item.Book.Name }}</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  props: ["books"],
  data: function () {
    return {};
  },
  methods: {
    clickBook(item) {
      let id = item.Book.Id
      this.$router.push({name:'Detail',params:{id:id}})
    },
  },
};
</script>

<style scoped>
.bookText {
  font-size: 13px;
}
</style>
