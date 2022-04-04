const express = require("express");
const router = express.Router();
const api_handler = require("../router_handler/user.js");
router.get("/login", api_handler.login);
module.exports = router;
