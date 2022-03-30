# ##机客行##

#### #技术栈：HBuilderX+uniapp+pinia+node+express+mysql#

难点：
    1.实现分页的形式提取首页数据，下拉即可加载更多，减少服务器负载。
    2.原生语言提交git：'git add .' 'git commit -m "init project'
​    3.通过改变class实现侧边栏效果：class="['normal',(a==active)?'active';'']"
    4.搜索框实现防抖功能和自动聚焦功能
    5."SELECT * FROM message where CPU like '%" + req.query.list + "%'";更深的理解了字符串拼接
    6.对computed属性有了更深的认识，学习使用ES6新语法set
    7.优化设计：在onLoad（created）（Setup）之前，list值为[],因此会出现闪烁，给展示区域增加v-if即可
    <view v-if="item.name"> </view>

     
