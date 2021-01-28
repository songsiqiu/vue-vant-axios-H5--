<template>
  <div class="title">
    <span>{{ barTitle }}</span>
  </div>
</template>

<script>
export default {
  props: ["barTitle"],
  data: function () {
    return {};
  },
};
</script>

<style scoped>
.title {
  padding: 5px 0;
  background-color: #f6f2e9;
}
.title span {
  border-left: 1px solid #7baeb1;
  padding: 0 5px;
  margin-left: 5px;
}
</style>
