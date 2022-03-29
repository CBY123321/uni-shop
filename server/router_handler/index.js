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
    "SELECT * FROM message where concat(message.desc,message.CPU,message.maker,message.name) like '%" + req.query.list + "%'";
  db.query(sql, null, (err, results) => {
    res.cc(results,0)
  })
}
