<template>
  <div class="home">
    <div class="header">
      <van-nav-bar fixed title="编辑资料" left-arrow @click-left="onClickLeft">
      </van-nav-bar>
    </div>
    <div class="content">
      <div class="avatars">
        <van-image
          width="100"
          round
          height="100"
  
        />
      </div>
      <van-form validate-first @failed="onFailed" @submit="onSubmit">
        <van-field
          v-model="userInfo.Id"
          label="ID"
          disabled
        />
        <van-field
          v-model="userInfo.Name"
          label="用户名"
          name="pattern"
          placeholder="请输入姓名"
          :rules="[{ pattern:patternName, message: '请输入正确的姓名' }]"
        />
        <van-field
          v-model="userInfo.Phone"
          label="手机号码"
          name="pattern"
          placeholder="请输入手机号码"
          :rules="[{ pattern:patternPhone, message: '请输入正确的手机号码' }]"
        />
        <van-field
          v-model="userInfo.CardId"
          label="身份证号"
          name="pattern"
          placeholder="请输入身份证号"
          :rules="[{ pattern:patternCardID, message: '请输入正确的身份证号' }]"
        />
        <van-field
          v-model="userInfo.Address"
          label="家庭住址"
          name="pattern"
          placeholder="请输入家庭住址"
          :rules="[{ pattern:patternAddress, message: '请输入正确的家庭住址' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >提交</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { queryReaderInfo,modifyReaderInfo } from "@/api/my";
export default {
  data: function () {
    return {
      userInfo:{},
      patternName:/[\u4e00-\u9fa5]{1,6}/,
      patternPhone:/^1[3,4,5,7,8]\d{9}$/,
      patternCardID:/^\d{15}$|^\d{18}$/,
      patternAddress:null
    };
  },
  methods: {
    onClickLeft() {
      window.history.back();
    },
    onFailed(){},
    onSubmit(){
      let data = {id:this.userInfo.Id,phone:this.userInfo.Phone,name:this.userInfo.Name,address:this.userInfo.Address,cardId:this.userInfo.CardId,libraryId:null}
      modifyReaderInfo(data)
        .then((res)=>{
           this.$toast(res.Message)
        })
    }
  },
  created() {
    let id = JSON.parse(localStorage.getItem("user")).Id;
    queryReaderInfo(id).then((res) => {
      if (res.Code == 100) {
        this.userInfo = res.Data;
      } else {
        this.$toast(res.Message);
      }
    });
  },
};
</script>

<style lang='less' scoped>
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
.avatars {
  padding-bottom: 20px;
  text-align: center;
  border-bottom: 1px solid #7baeb1;
}
/deep/ .van-nav-bar__content {
  background-color: #7baeb1;
}
/deep/ .van-nav-bar__title {
  color: #fff;
}
/deep/ .van-icon-arrow-left::before {
  color: #fff;
}
/deep/ .van-button--info {
  background-color: #7baeb1;
}
</style>
