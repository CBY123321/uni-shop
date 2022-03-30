<template>
  <view class="container">

    <search @click='search'></search>


    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.id">
          <!-- 动态绑定图片的 src 属性 -->
          <image :src="item.url"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <view class="nav-list">
      <view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
        <image :src="item.url" class="nav-img"></image>
        <i>{{item.name}}</i>
      </view>
    </view>
    <view class="content">
      <view class="content-box" v-for="item,i in data" :key='i'>
        <image :src="item.img" mode=""></image>
        <view class="msg"> <text class="desc">{{item.desc}}</text>
          <br />
          <text class="price">￥{{item.price}}</text>
          <view class="detail" @click="toGoods(item.id)">查看详情 </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import search from '../../components/search.vue';
  export default {
    components: {
      search
    },
    data() {
      return {
        swiperList: [],
        data: [],
        phone: [],
        ear: [],
        page: 0,
        computer: [],
        navList: [{
          url: '/static/table/computer.png',
          name: '电脑',
          type:2
        }, {
          url: '/static/table/ear.png',
          name: '耳机',
          type:3
        }, {
          url: '/static/table/phone.png',
          name: '手机',
          type:1
        }, {
          url: '/static/table/cart.png',
          name: '分类'
        }],
      }
    },
    onLoad() {
      this.getSWiperList();
      this.getData()
    },
    onReachBottom() {
      uni.$showMsg('加载中');
      this.page++;
      this.getData();

    },
    methods: {
      toGoods(e){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?id='+e
        })
      },
      search() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      },
      // nav-item 项被点击时候的事件处理函数
      navClickHandler(item) {
        // 判断点击的是哪个 nav
        if (item.name === '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }else{
         uni.navigateTo({
           url:'/subpkg/goods_list/goods_list?type='+item.type
         }) 
        }
      },
      async getSWiperList() {
        const {
          data: res
        } = await uni.$http.get('/my/getSwiperList');
        console.log(res);
        this.swiperList = res.message
      },
      async getData() {
        const {
          data: res2
        } = await uni.$http.get('/my/getData', {
          page: this.page
        })
        console.log(res2);
        if (res2.status == 404) {
          uni.$showMsg('没有更多了！')
        } else {
          for (var i in res2.message) {
            this.data.push(res2.message[i]);
          }
        }

      }
    }
  }
</script>

<style lang="less">
  .container {
    height: 100%;


    swiper {
      height: 330rpx;



      .swiper-item,
      image {
        width: 100%;
        height: 100%;
      }
    }

    .nav-list {
      display: flex;
      justify-content: space-around;
      margin: 15px 0;

      .nav-img {
        width: 80rpx;
        height: 80rpx;
      }

      i {
        margin-left: 5px;
        font-size: 15px;
        font-weight: 600;
        color: #6E6E6E;
      }
    }

    .content {
      display: flex;
      box-sizing: border-box;
      justify-content: space-between;
      flex-wrap: wrap;

      .content-box {
        position: relative;
        background-color: white;
        border-radius: 30rpx;
        // background-color: red;
        align-items: center;
        justify-content: center;
        width: 350rpx;
        height: 550rpx;
        margin-top: 30rpx;
        border: 1px solid #424242;

        image {
          width: 350rpx;
          height: 350rpx;
          border-radius: 30rpx 30rpx 0 0;
          margin-bottom: 30rpx;
          // margin: 30rpx;
          // margin-left: 26rpx;
        }

        .msg {
          padding: 10rpx;

          .desc {
            width: 172px;
            height: 45px;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2
          }
        }

        .price {
          position: absolute;
          left: 15rpx;
          bottom: 20rpx;
          color: #Ff5500
        }

        .detail {
          width: 150rpx;
          height: 50rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          right: 20rpx;
          bottom: 15rpx;
          background-color: #3ADF00;
          border-radius: 50rpx;

          font-size: 13px;
          border: 1px solid #D8D8D8;
          color: white;
        }

      }
    }
  }
</style>
