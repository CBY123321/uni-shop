<template>
  <view class="container">
    <view class="loginFail" v-if="JSON.stringify(userInfo)=='{}'">
      <button type="default" @click="getUserInfo" >一键登录</button>
    </view>
    <view class="loginSucc" v-else>
      <image :src="userInfo.avatarUrl" mode=""></image>
      <view class="name">
ID:{{userInfo.nickName}}
      </view>
    </view>
  </view>

</template>

<script>
  export default {
    data() {
      return {
        userInfo: {
          // avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIowbz5xxVOJa0hL3EScFqPiaTFicEUUM36SZ90Oe1UEcu4qk6Nib9n14ppDtARZsujYhlC4eCM9E1Rg/132",
          // city: "",
          // country: "",
          // gender: 0,
          // language: "zh_CN",
          // nickName: "早点早点",
          // province: "",
        }
      }
    },
    methods: {
      getUserInfo() {
        uni.getUserProfile({
          desc: '123',
          success: (e) => {
            console.log(e)
            this.userInfo = e.userInfo
          },
          fail: (err) => {
            uni.$showMsg('用户取消了授权')
          }
        })
      }
    }
  }
</script>

<style lang="less">
  .container {
    padding: 0px 10px;

    .loginFail {
      height: 500px;
      display: flex;
      align-items: center;

      button {
        background-color: #00b26a;
        width: 200px;
        color: white;
      }

    }
    .loginSucc{
      margin-top: 20px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: white;
      border-radius: 20px;
      
      image{
           width: 100px;
      height: 100px;
      border-radius: 100px;
      border: 1px solid;
      }
      .name{
        margin-top: 10px;
      }
   
    }
  }
</style>
