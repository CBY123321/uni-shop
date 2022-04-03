<template>
  <view class="container">
    <view class="title">
      <uni-icons type="cart" color="#088A08" size="30"></uni-icons>
      <text>购物车</text>
    </view>
    <view class="cart" v-for="item,i in list" :key='i'>
      <view class="cart_top">
        <uni-icons type="shop-filled" size="30" />
        <text>{{item.brand}}</text>
      </view>
      <view class="cart_bottom">
        <radio :value="item.id" :checked="item.state==true?true:false" @click="cancel(item.id)" />
        <image :src="item.img" mode=""></image>
        <view class="desc">
          <view class="top">
            {{item.desc}}
          </view>
          <view class="bottom">
            <text>￥<text>{{item.price}}</text></text>
            <uni-number-box :min="1" :max="5" v-model="item.count" @change="countChange"></uni-number-box>
          </view>
        </view>
      </view>
    </view>
    <view class="total">
      <view class="total_left">
        <radio @click='this.checkAll' :checked="allCheck"></radio>
        <text>全选</text>
      </view>
      <view class="total_right">
        合计：<text>￥<text>{{price}}</text></text>
        <view class="button">
          结算
        </view>

      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        list: [],
        price: 0,
        allCheck: false
      }
    },

    onShow() {
      this.getCartMsg()
    },
    methods: {      
      countChange(e){
        // console.log(e)
       this.$nextTick(()=>{
         this.getCount()
       }) 
      },
      getCount() {
        var a = 0
        this.list.filter(x => x.state).forEach(x => {
          a += x.price * x.count
        })
        this.price = a
      },
      cancel(e) {
        const b = this.list.find(x => x.id == e)
        b.state = !b.state
        let n = 0
        for (var i in this.list) {
          n += !this.list[i].state
        }
        if (n == 0) {
          this.allCheck = 1
        } else {
          this.allCheck = 0
        }
        this.getCount()
        // this.$forceUpdate();
      },
      async getCartMsg() {
        const a = JSON.parse(uni.getStorageSync('cart'))
        console.log(a)

        for (var i in a) {
          const {
            data: res
          } = await uni.$http.get('/my/getCartMsg', {
            id: a[i].id
          });
          this.list.push(res.message[0])
          this.list[i].count = a[i].count
          this.list[i].state = a[i].state
        }
      },
      checkAll(e) {
        this.allCheck = !this.allCheck
        let a = 1
        if (this.allCheck == 0) {
          a = 0
        }
        for (var i in this.list) {
          this.list[i].state = a
        }
        this.getCount()
      }
    },
  }
</script>

<style lang="less">
  .container {
    margin-bottom: 120rpx;

    .title {
      background-color: white;
      padding: 10px 0;
      border-radius: 0 0 20px 20px;

      text {
        color: #585858;
        font-size: 18px;
        margin-left: 10px;
        vertical-align: middle;
      }
    }

    .cart {
      margin: 20px 0;
      border-radius: 20px;
      padding: 10px;
      background-color: white;

      .cart_top {
        margin-bottom: 10px;

        text {
          vertical-align: middle;
          margin-left: 12px;
          font-size: 16px;

        }
      }

      .cart_bottom {
        display: flex;
        align-items: center;

        image {
          flex: 3;
          width: 250rpx;
          height: 250rpx;
        }

        .desc {
          flex: 5;

          .top {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            margin-bottom: 30px;
          }

          .bottom {
            text {
              font-size: 15px;

              // justify-content: center;
              color: #Ff5500;

              text {
                font-size: 20px;
              }
            }

            display: flex;
            justify-content: space-between;
          }
        }
      }
    }

    .total {
      padding: 0 10px;
      box-sizing: border-box;
      border-top: 1px solid rgb(222, 222, 222);
      position: fixed;
      bottom: 0;
      background-color: white;
      height: 120rpx;
      width: 100%;
      display: flex;
      justify-content: space-between;


      z-index: 999;
      align-items: center;

      .total_left {
        text {
          font-size: 15px
        }
      }

      .total_right {
        display: flex;
        align-items: center;
        font-size: 13px;
        vertical-align: bottom;

        text {
          margin-right: 11px;
          color: #Ff5500;
          font-size: 13px;

          text {
            font-size: 20px;
          }
        }

        .button {
          color: white;
          ;
          background-color: #00ff00;
          padding: 10px 25px;
          border-radius: 20px;
        }
      }

    }
  }
</style>
