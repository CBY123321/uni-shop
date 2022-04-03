<template>
  <view class="container">
    <view class="noCon" v-if="JSON.stringify(address)==='{}'">
      <button type="default" size='mini' @click="chooseAddress">请选择收货地址</button>
    </view>
    <view class="withCon" @click="chooseAddress" v-else>
      <view class="left">
        <uni-icons type="location-filled" size="35"></uni-icons>
      </view>
      <view class="middle">
        <view class="address">
          {{Address}}
        </view>
        <view class="contact">
          <text>{{Name}}</text><text>{{Tel}}</text>
        </view>
      </view>
      <view class="right">
        <uni-icons type="right"></uni-icons>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {

    data() {
      return {
        address: {}
      }
    },
    computed: {
      Address() {
        return this.address.provinceName + this.address.cityName + this.address.countyName + this.address.detailInfo
      },
      Name() {
        return this.address.userName
      },
      Tel() {
        return this.address.telNumber
      }
    },
    methods: {
      ...mapMutations('user', ['getAddress']),
      async chooseAddress() {
        const [err, msg] = await uni.chooseAddress().catch(err => err)
        if (err === null && msg.errMsg === 'chooseAddress:ok') {
          // 为 data 里面的收货地址对象赋值
          this.address = msg
          this.getAddress({
           Address: this.Address,
           Name: this.Name,
            Tel:this.Tel
          })

        }
      }
    }
  }
</script>

<style lang='less' scoped>
  .container {
    margin: 15px 0;

    border-radius: 20px;
    background-color: white;


    .noCon {
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;

      button {
        color: white;
        background-color: rgb(0, 178, 106);
      }
    }

    .withCon {
      height: 100px;
      display: flex;
      align-items: center;

      .left {
        flex: 1.1;
      }

      .middle {
        flex: 9;

        .address {
          font-size: 18px;
          font-weight: 550;
        }

        .contact {
          font-size: 15px;
          line-height: 20px;
          color: #585858;

          text:first-of-type {

            margin-right: 10px;
          }
        }
      }

      .right {
        flex: 0.8
      }

    }
  }
</style>
