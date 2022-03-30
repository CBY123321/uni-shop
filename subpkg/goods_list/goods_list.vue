<template>
  <view class="container">
    <view class="goods-box" v-for="item,i in goodsList" :key='i'>
      <image :src="item.img" mode=""></image>
      <view class="content">
        <view class="desc">
          {{item.desc}}
        </view>
        <view class="query">
          <view class="CPU">
            {{item.maker+item.CPU}}
          </view>
          <view class="feature">
            {{item.feature}}
          </view>
        </view>
        <view class="price">
          ￥<text>{{item.price}}</text>
        </view>
        <view class="detail">
          查看详情
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    onLoad(e) {
      this.uid = e.uid,
        this.id = e.id,
        this.type = e.type,
        this.getGoodsList()
    },
    onReachBottom() {
      uni.$showMsg('加载中')
      this.page++;
      this.getGoodsList()
    },
    methods: {
      async getGoodsList() {
        const {
          data: res
        } = await uni.$http.get('/my/getGoodsList', {
          uid: this.uid,
          id: this.id,
          cate: this.type,
          page: this.page
        })
        console.log(res)
        if (res.status == 404) {
          uni.$showMsg('没有更多啦')
        }else{
            this.goodsList.push(...res.message)
        }
      
      }
    },
    data() {
      return {
        uid: 0,
        type: 0,
        id: 0,
        page: 0,
        goodsList: []
      };
    }
  }
</script>

<style lang="less">
  .container {
    // height: 100%;
    //

    .goods-box {
      background-color: white;
      margin: 20px 5px;
      display: flex;
      height: 280rpx;
      border-radius: 22px;
      border: 1px solid #088A08;



      // background-color: pink;
      image {
        border-radius: 22px;
        // flex: 4;
        height: 260rpx;
        padding: 5px;
        width: 260rpx;
      }

      .content {
        flex: 6;
        position: relative;
        padding: 18px;

        .desc {
          font-size: 18px;
          display: -webkit-box;
          overflow: hidden;
          -webkit-box-orient: vertical;

          -webkit-line-clamp: 2;
        }

        .query {

          margin-top: 10px;
          display: flex;

          .CPU {
            padding-right: 10px;
            border-right: 1px solid black;
          }

          .feature {

            margin-left: 10px;
          }

        }

        .price {

          position: absolute;
          left: 15px;
          bottom: 15px;
          color: #Ff5500;

          text {
            font-size: 20px;
          }
        }

        .detail {
          width: 180rpx;
          height: 70rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          right: 20rpx;
          bottom: 15rpx;
          background-color: #3ADF00;
          border-radius: 50rpx;
          font-size: 14px;
          border: 1px solid #D8D8D8;
          color: white;
          border: 1px solid #088A08;
        }


      }


    }
  }

  .goods-box:first-of-type {
    margin-top: 1px;
  }

  .goods-box:last-of-type {
    margin-bottom: 1px;
  }
</style>
