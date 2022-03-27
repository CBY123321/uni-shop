<template>
  <view class="container">
    <view class="search">

    </view>
    <view class="cate">
      <view class="left">
        <view :class="['type',(item.id==active)?'active':'']" v-for="item,i in left" :key='i' @click="change(i)">
          <image :src="item.url" mode=""></image>{{item.name}}
        </view>
      </view>
      <scroll-view scroll-y class="scoll">
        <view class="right">
          <view class="brand" v-for="item,i in brandPhone" :key='i'>
            <image :src="item.picture" mode=""></image>{{item.brand}}
          </view>
        
     
        </view>
      </scroll-view>

    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        left: [{
          url: '../../static/cate/left/phone.png',
          name: '手机',
          id: 0
        }, {
          url: '../../static/cate/left/computer.png',
          name: '电脑',
          id: 1
        }, {
          url: '../../static/cate/left/ear.png',
          name: '耳机',
          id: 2
        }, ],
        active: 0,brandPhone:[]
      }
    },
    created(){
      this.getCate()
    },
    methods: {
      async getCate(){
       const {data:res}=await uni.$http.get('/my/getCate');
       this.brandPhone=res.message.data
      },
      change(e) {
        this.active = e
      }
    }
  }
</script>

<style lang="less">
  .container {
    height: 100%;

    .search {
      background-color: pink;
      height: 10%;
    }

    .cate {
      border-top: 1px solid;
      height: 90%;
      display: flex;

      .left {
        height: 100%;
        width: 35%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        // margin-right: 20rpx;

        border-right: 1px solid;
        // background-color: white;

        .type {
          height: 33.33%;
          // border-radius: 40rpx;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          // background-color: white;
          color: #424242;
          font-size: 20px;

          // border: 5rpx solid #D8D8D8
          image {
            width: 70px;
            height: 70px;
            margin-bottom: 10px;
          }
        }



        .active {
          background-color: white;
        }
      }

      .scoll {
        height: 100%;
        width: 65%;
        background-color: white;

        .right {
          display: flex;
          flex-direction: row;


          flex-wrap: wrap;
          height: 100%;

          .brand {
            // margin: 20rpx;
            width: 50%;
            height: 33%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            image {
              width: 150rpx;
              height: 150rpx;
              margin-bottom: 15px;
            }
          }
        }
      }


    }
  }
</style>
