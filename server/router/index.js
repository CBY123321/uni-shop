const express = require("express");
const router = express.Router();
const user_handler = require("../router_handler/index.js");
router.get('/getSwiperList',user_handler.getSwiperList);
router.get('/getData',user_handler.getData)
router.get('/getCate',user_handler.getCate)
router.get('/getSearchList',user_handler.getSearchList)
module.exports = router;