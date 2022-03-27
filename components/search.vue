<template>
  <view class="searchBox">
    <view class="search" @click="onsearch">


      <uni-icons type="search" size="30"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    methods:{
    onsearch() {
      this.$emit('click')
    }}
  }
  
</script>

<style lang="less" scoped>
  .searchBox {
    background-color: #00ff00;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;

    .search {
      .placeholder {
        font-size: 18px;
        margin-left: 20rpx;
      }

      display: flex;
      justify-content: center;
      align-items: center;
      background-color: white;
      border-radius: 43rpx;
      width: 90%;
      height: 60%;
    }
  }
</style>
