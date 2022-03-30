<template>
  <view class="container">

    <uni-goods-nav class="nav" :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
      @buttonClick="buttonClick" />
  </view>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          icon: 'shop',
          text: '品牌',
        }, {
          icon: 'cart',
          text: '购物车',
          info: 0
        }],
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: '#1ae21a',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#019c01',
            color: '#fff'
          }
        ]
      };
    },
    methods: {
      onClick() {
        console.log(1)
      },
      buttonClick(e) {
        console.log(e)
      }
    }
  }
</script>

<style lang="less">
.container{
  .nav{
    width:100%;
    position: fixed;
    bottom:0px;
    
  }
}
</style>
