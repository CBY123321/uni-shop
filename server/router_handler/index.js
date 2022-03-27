const db = require("../db/index");
// 轮播图
exports.getSwiperList = (req, res) => {
  sql='select * from swiper'
    db.query(sql,null,(err,results)=>{
      res.cc(results, 0)
    })
  },
  // 获取首页数据，以分页形式展示
  exports.getData = (req, res) => {
    sql = 'select * from message';
    db.query(sql, req.query.page , (err, results) => {
      var size = 4;
      var start =(req.query.page ||0)* size;
      var end = start + size;
      if(start>results.length){res.cc('none',404)}else{ res.cc(results.slice(start,end), 0)}
     

    })
  }
