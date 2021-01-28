<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="sms"
        name="短信验证码"
        label="短信验证码"
        placeholder="请输入短信验证码"
        center
        clearable
        :rules="[{ required: true, message: '请填写短信验证码' }]"
      >
        <template #button>
          <van-button size="small" color="#7baeb1">发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      username: "",
      sms: "",
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
  },
};
</script>

<style scoped>
</style>
