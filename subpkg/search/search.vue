<template>
  <view class="page">
    <uni-search-bar :focus="true" radius="30" @confirm="search" @input="input" cancelButton=none></uni-search-bar>
    <view class="result" v-if='searchResults.length !== 0'>
      <view class="result-each" v-for="item in searchResults" :key=item.id>
        {{item.name}}
      </view>
    </view>
    <view class="history" v-else>
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash-filled" size="30" @click="cleanHistory" color='#6E6E6E'></uni-icons>
      </view>
      <view class="history-content">
        <uni-tag :text="item" inverted=true type='success' v-for="(item, i) in historys" :key="i"></uni-tag>
      </view>

    </view>
  </view>

</template>

<script>
  export default {
    data() {
      return {
        kw: '',
        timer: null,
        searchResults: [],
        historyList: [],
        Bool: false
      };
    },

    methods: {
      onLoad() {
        this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
      },
      input(e) {

        // 清除 timer 对应的延时器
        clearTimeout(this.timer)
        // 重新启动一个延时器，并把 timerId 赋值给 this.timer
        this.timer = setTimeout(() => {
          // 如果 500 毫秒内，没有触发新的输入事件，则为搜索关键词赋值
          this.kw = e
          this.getSearchList()

        }, 500)
      },
      async getSearchList() {
        // 判断关键词是否为空
        if (this.kw === '') {
          this.searchResults = []
          return
        }
        // 发起请求，获取搜索建议列表
        const {
          data: res
        } = await uni.$http.get('/my/getSearchList', {
          list: this.kw
        })
        this.searchResults = res.message;
        this.saveSearchHistory()
      },
      saveSearchHistory() {
        // 2.1 直接把搜索关键词 push 到 historyList 数组中

        // 1. 将 Array 数组转化为 Set 对象
        const set = new Set(this.historyList)
        // 2. 调用 Set 对象的 delete 方法，移除对应的元素
        set.delete(this.kw)
        // 3. 调用 Set 对象的 add 方法，向 Set 中添加元素
        set.add(this.kw)
        // 4. 将 Set 对象转化为 Array 数组
        this.historyList = Array.from(set)
        uni.setStorageSync('kw', JSON.stringify(this.historyList))
      },
       // 清空搜索历史记录
      cleanHistory() {
        // 清空 data 中保存的搜索历史
        this.historyList = []
        // 清空本地存储中记录的搜索历史
        uni.setStorageSync('kw', '[]')
      }
    },
    computed: {
      historys() {
        // 注意：由于数组是引用类型，所以不要直接基于原数组调用 reverse 方法，以免修改原数组中元素的顺序
        // 而是应该新建一个内存无关的数组，再进行 reverse 反转
        return [...this.historyList].reverse()
      }
    }
  }
</script>

<style lang="less">
  .page {
    background-color: white;
    height: 100%;

    .result {
      height: 90%;
      // background-color: red;

      .result-each {
        border: 1px solid #F2F2F2;
        height: 10%;
        display: flex;
        color: #0B6121;
        align-items: center;
        font-size: 18px;
        padding: 0 5%;
        // background-color: blue;
      }
    }

    .history {
      padding: 10px 20px;

      .history-title {
        display: flex;
        justify-content: space-between;

        text {
          font-size: 18px;
        }

      }

      .history-content {

        display: flex;
        flex-wrap: wrap;

        uni-tag {
          margin-top: 15px;
          margin-right: 15px;
        }



      }
    }
  }
</style>
