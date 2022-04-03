<template>
  <view class="container">
    <swiper class="swiper">
      <swiper-item v-for="item,i in detailSwiper" :key=i>
        <image :src="item.img" mode=""></image>
      </swiper-item>
    </swiper>
    <view class="params">
      <image :src="params" mode=""></image>
    </view>
    <view class="detail">
      <view class="price">
        ￥<text>{{price}}</text>
      </view>
      <view class="desc">
        <text>{{desc}}</text>
      </view>
      <view class="value">
        <view class="cpu">
          {{CPU}}
        </view>
        <view class="feature">
          {{feature}}
        </view>
      </view>
    </view>
    <uni-goods-nav class="nav" :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
      @buttonClick="buttonClick" />
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations,
    mapGetters
  } from 'vuex';
  export default {
    data() {
      return {
        id: 0,
        price: 0,
        desc: '',
        CPU: '',
        feature: '',
        params: '',
        detailSwiper: [{
          img: ''
        }, {
          img: ''
        }, {
          img: ''
        }],
        options: [{
          icon: 'shop',
          text: '品牌',
        }, {
          icon: 'cart',
          text: '购物车',
          infoBackgroundColor	:'#00ff00',
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
    onLoad(e) {
      this.id = e.id
      this.getDetailMsg();

    },
    methods: {
      ...mapMutations('cart', ['getCart']),
      async getDetailMsg() {
        const {
          data: res
        } = await uni.$http.get('/my/getDetailMsg', {
          id: this.id
        })
        console.log(res)
        this.detailSwiper[0].img = res.message[0].img
        this.detailSwiper[1].img = res.message[0].img2
        this.detailSwiper[2].img = res.message[0].img3
        this.price = res.message[0].price
        this.desc = res.message[0].desc
        this.feature = res.message[0].feature
        this.params = res.message[0].params
        this.CPU = res.message[0].maker + res.message[0].CPU
      },
      onClick() {
        console.log(1)
      },
      buttonClick(e) {
        if (e.index == 0) {
          const good = {
            id: this.id,
            count: 1,
            state:0
          };
          this.getCart(good)
        }
      }
    },
    watch: {
      getCount: {
           // handler 属性用来定义侦听器的 function 处理函数
           handler(newVal) {
              const findResult = this.options.find(x => x.text === '购物车')
              if (findResult) {
                 findResult.info = newVal
              }
           },
           // immediate 属性用来声明此侦听器，是否在页面初次加载完毕后立即调用
           immediate: true
        }
    },
    computed: {
      ...mapGetters('cart', ['getCount'])
    }
  }
</script>

<style lang="less">
  .container {
    background-color: white;
    padding-bottom: 100rpx;

    .swiper {
      // background-color: red;
      height: 750rpx;

      image {
        height: 100%;
        width: 100%;
      }
    }

    .params {
      margin-top: 10px;

      image {
        width: 100%;
        height: 140px;

      }
    }

    .detail {
      background-color: white;
      // border:1px solid #69ad52;
      border-radius: 10px;
      padding: 0px 5px;
      margin: 0px 8px;

      .price {
        font-size: 15px;

        color: #Ff5500;
        margin-bottom: 10px;

        text {
          font-size: 25px;
        }
      }

      .desc {
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 20px;
      }

      .value {
        display: flex;
        justify-content: center;
        color: #BDBDBD;

        .cpu {
          padding: 0 10px;
          border-right: 1px solid #BDBDBD;
        }

        .feature {
          padding: 0 10px;
        }
      }
    }



    .nav {
      width: 100%;
      position: fixed;
      bottom: 0px;

    }
  }
</style>
