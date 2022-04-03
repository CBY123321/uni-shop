const db = require("../db/index");
// 轮播图
exports.getSwiperList = (req, res) => {
    sql = 'select * from swiper'
    db.query(sql, null, (err, results) => {
      res.cc(results, 0)
    })
  },
  // 获取首页数据，以分页形式展示
  exports.getData = (req, res) => {
    sql = 'select * from message';
    db.query(sql, req.query.page, (err, results) => {
      var size = 4;
      var start = (req.query.page || 0) * size;
      var end = start + size;
      if (start > results.length) {
        res.cc('none', 404)
      } else {
        res.cc(results.slice(start, end), 0)
      }
    })
  }
// 获取分类页面数据
exports.getCate = (req, res) => {
  sql = "select * from brand where type like '%1%';";
  sql += "select * from brand where type like '%2%';";
  sql += "select * from brand where type like '%3%';";
  db.query(sql, null, (err, results) => {

    res.cc({
      phone: results[0],
      computer: results[1],
      ear: results[2],
    }, 0)
  })
}
exports.getSearchList = (req, res) => {
  sql =
    "SELECT * FROM message where concat(message.desc,message.CPU,message.maker,message.name) like '%" + req.query
    .list + "%'";
  db.query(sql, null, (err, results) => {
    res.cc(results, 0)
  })
}
exports.getGoodsList = (req, res) => {
  var page = req.query.page || 0;
  var each = 6;
  var start = page * each;
  var end = start + each
  sql = 'SELECT * FROM `uni-ele`.message where brand=? or id=? or cate=?;'
  db.query(sql, [req.query.uid, req.query.id, req.query.cate], (err, results) => {
    if (start > results.length) res.cc('没有更多啦!', 404)
    else {
      res.cc(results.slice(start, end), 0)
    }
  })
}
exports.getDetailSwiper = (req, res) => {
  sql =
    "select img,img2,img3 from message where id=?";
  db.query(sql, req.query.id, (err, results) => {
    res.cc([{
      img: results[0]
        .img
    }, {
      img: results[0]
        .img2
    }, {
      img: results[0]
        .img3
    }], 0)
  })
}
exports.getDetailMsg = (req, res) => {
  sql =
    "SELECT * FROM message where id=?";
  db.query(sql, req.query.id, (err, results) => {
    res.cc(results, 0)
  })
}
exports.getCartMsg=(req,res)=>{
  sql="SELECT message.img,message.id,message.name,brand.brand,message.price,message.desc FROM `uni-ele`.message right join `uni-ele`.brand on message.brand=brand.bid where message.id =?";
  db.query(sql,req.query.id,(err,results)=>{
    res.cc(results,0)
  })
}