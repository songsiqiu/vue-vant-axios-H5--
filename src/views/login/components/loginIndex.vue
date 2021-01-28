<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="phone"
        name="phone"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <p class="password">
        <router-link to="/login/resetpwd">忘记密码</router-link>
      </p>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import {swiperImgs} from '@/api/user'
export default {
  data: function () {
    return {
      phone: "",
      password: "",
    };
  },
  methods: {
    onSubmit(values) {
      swiperImgs(values).then((data)=>{
        if(data.Code === 100) {
          localStorage.setItem('user',JSON.stringify(data.Data))
          this.$router.push('/my')
        }else if(data.Code === 110) {
          this.$toast("密码错误")
        }else{
          this.$toast("用户名或者密码错误")
        }
      })
      .catch((err)=>{
        this.$toast("登录发生错误"+err)
      })
    },
  },
};
</script>

<style scoped>
.password {
  text-align: right;
  margin-top: 10px;
}
</style>
