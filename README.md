# 机客行

#### 技术栈：HBuilderX+uniapp+pinia+node+express+mysql

难点：
    1.实现分页的形式提取首页数据，下拉即可加载更多，减少服务器负载。
    2.原生语言提交git：'git add .' 'git commit -m "init project'
​    3.通过改变class实现侧边栏效果：class="['normal',(a==active)?'active';'']"
    4.搜索框实现防抖功能和自动聚焦功能
    5."SELECT * FROM message where CPU like '%" + req.query.list + "%'";更深的理解了字符串拼接
    6.对computed属性有了更深的认识，学习使用ES6新语法set
    7.优化设计：在onLoad（created）（Setup）之前，list值为[],因此会出现闪烁，给展示区域增加v-if即可
    <view v-if="item.name"> </view>
    7.初步了解mixins。
    8.使用普通函数的形式定义的 watch 侦听器，在页面首次加载后不会被调用。为了防止这个上述问题，可以使用对象的形式来定义 watch 侦听器: 
    total: {
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
    9.能够对vueX中的state,mutations,actions,getters进行自由的使用
    10.实现文章内容只显示两行，其余部分用省略号代替  
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow:hidden;
    11.判断是否为空对象可以使用JSON.stringfy(address)==='{}'
